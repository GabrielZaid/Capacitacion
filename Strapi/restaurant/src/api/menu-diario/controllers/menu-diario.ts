/**
 * menu-diario controller
 */
import { Context } from 'koa';
import { factories } from '@strapi/strapi'

// ====== Funciones Auxiliares ======

/**
 * Extrae los postres de una lista de menús
 */
function extraerPostres(menus: any[]): any[] {
  return menus
    .map(menu => menu?.Postre)
    .filter(Boolean);
}

/**
 * Construye el filtro de precios para la consulta
 */
function construirFiltroPrecio(min?: string, max?: string): Record<string, any> {
  const filtro: Record<string, any> = {};
  if (min) filtro.Precio = { $gte: Number(min) };
  if (max) filtro.Precio = { ...filtro.Precio, $lte: Number(max) };
  return filtro;
}

/**
 * Construye el filtro de suma de precios para la consulta avanzada
 */
function construirFiltroSumaPrecio(min?: string, max?: string): Record<string, any> {
  const filtro: Record<string, any> = {};
  if (min) filtro.Sum_Precio = { ...(filtro.Sum_Precio || {}), $gte: Number(min) };
  if (max) filtro.Sum_Precio = { ...(filtro.Sum_Precio || {}), $lte: Number(max) };
  return filtro;
}

/**
 * Filtra menús excluyendo los que tengan ciertos alérgenos
 */
function excluirMenusPorAlergenos(menus: any[], alergenos: string[]): any[] {
  const excluir = alergenos.map(a => a.trim().toLowerCase());
  return menus.filter(menu => {
    const platos = [menu.Primero, menu.Segundo, menu.Postre].filter(Boolean);
    return !platos.some(plato =>
      (plato.Alergeno || []).some((alergeno: any) =>
        excluir.includes((alergeno.nombre || alergeno.Nombre || '').toLowerCase())
      )
    );
  });
}

// ====== Controlador Principal ======

export default factories.createCoreController('api::menu-diario.menu-diario', ({ strapi }) => ({

  // GET /menus/postres
  async getPostres(ctx: Context) {
    try {
      console.log("getPostres");
      const menus = await strapi.entityService.findMany('api::menu-diario.menu-diario', {
        populate: { Postre: true },
      });
      ctx.body = extraerPostres(menus);
      

    } catch (error: any) {
      ctx.status = error.status || 500;
      ctx.body = {
        data: null,
        error: {
          status: ctx.status,
          name: error.name || 'InternalServerError',
          message: error.message || 'Error al obtener los postres',
          details: error.details || {},
        },
      };
    }
  },

  // GET /menus?min_precio=10&max_precio=20
  async getMenusByPrecio(ctx: Context) {
    try {
      const min_precio = ctx.query.min_precio as string | undefined;
      const max_precio = ctx.query.max_precio as string | undefined;
      const filters = construirFiltroPrecio(min_precio, max_precio);
      const menus = await strapi.entityService.findMany('api::menu-diario.menu-diario', {
        filters,
      });
      ctx.body = menus;
    } catch (error: any) {
      ctx.status = error.status || 500;
      ctx.body = {
        data: null,
        error: {
          status: ctx.status,
          name: error.name || 'InternalServerError',
          message: error.message || 'Error al filtrar menús por precio',
          details: error.details || {},
        },
      };
    }
  },

  // GET /menus?min_precio=10&max_precio=20&excluir_alergenos=gluten,lactosa
  async filtrarMenus(ctx: Context) {
    try {
      const min_precio = ctx.query.min_precio as string | undefined;
      const max_precio = ctx.query.max_precio as string | undefined;
      const excluir_alergenos = ctx.query.excluir_alergenos as string | undefined;
      const filters = construirFiltroSumaPrecio(min_precio, max_precio);
      const menus = await strapi.documents('api::menu-diario.menu-diario').findMany({
        populate: {
          Primero: { populate: { Alergeno: true } },
          Segundo: { populate: { Alergeno: true } },
          Postre: { populate: { Alergeno: true } },
        },
        filters,
      });
      let resultado = menus;
      if (typeof excluir_alergenos === 'string') {
        const alergenos = excluir_alergenos.split(',');
        resultado = excluirMenusPorAlergenos(menus, alergenos);
      }
      ctx.body = { menus: resultado };
    } catch (error: any) {
      ctx.status = error.status || 500;
      ctx.body = {
        data: null,
        error: {
          status: ctx.status,
          name: error.name || 'InternalServerError',
          message: error.message || 'Error al filtrar menús por alérgenos',
          details: error.details || {},
        },
      };
    }
  },

  /**
   * GET /platos/populares
   * Devuelve los platos más populares (más veces aparecen en los menús diarios) y cuántas veces aparece cada uno
   */
  async getPlatosPopulares(ctx: Context) {
    try {

      const min_apariciones = ctx.query.min_apariciones as string | undefined;

      // Obtener todos los menús diarios con los platos populados
      const menus = await strapi.entityService.findMany('api::menu-diario.menu-diario', {
        populate: { Primero: true, Segundo: true, Postre: true },
      });

      // Contar apariciones de cada plato
      const contador: Record<string, { plato: any, apariciones: number }> = {};
      for (const menu of menus) {
        ['Primero', 'Segundo', 'Postre'].forEach(tipo => {
          const plato = (menu as any)[tipo];
          if (plato && plato.id) {
            const id = String(plato.id);
            if (!contador[id]) {
              contador[id] = { plato, apariciones: 1 };
            } else {
              contador[id].apariciones += 1;
            }
          }
        });
      }

      // Convertir a array y ordenar por apariciones descendente
      let populares = Object.values(contador)
        .sort((a, b) => b.apariciones - a.apariciones);

      if(min_apariciones){
        populares = populares.filter(plato => plato.apariciones >= Number(min_apariciones));
      }
      

      ctx.body = populares;
    } catch (error: any) {
      ctx.status = error.status || 500;
      ctx.body = {
        data: null,
        error: {
          status: ctx.status,
          name: error.name || 'InternalServerError',
          message: error.message || 'Error al obtener los platos populares',
          details: error.details || {},
        },
      };
    }
  }


}));
