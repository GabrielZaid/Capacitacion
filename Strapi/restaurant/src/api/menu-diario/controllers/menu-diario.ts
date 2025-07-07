/**
 * menu-diario controller
 */
import { Context } from 'koa';
import { sanitize, validate } from '@strapi/utils';
import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::menu-diario.menu-diario',{

    // GET /menus/postres
  async getPostres(ctx: Context) {
    // Usar Document Service API y nombres de campos correctos
    const menus = await strapi.documents('api::menu-diario.menu-diario').findMany({
      populate: { Postre: true },
      filters: { Postre: { $not: null } },
    });

    // Extraer solo los postres únicos
    const postres = menus
      .map((menu: any) => menu.Postre)
      .filter((postre: any) => !!postre);

    ctx.body = { postres };
  },

  // GET /menus?min_precio=10&max_precio=20&excluir_alergenos=gluten,lactosa
  async filtrarMenus(ctx: Context) {
    const { min_precio, max_precio, excluir_alergenos } = ctx.query;
    const filters: any = {};
    if (min_precio) filters.Sum_Precio = { ...(filters.Sum_Precio || {}), $gte: Number(min_precio) };
    if (max_precio) filters.Sum_Precio = { ...(filters.Sum_Precio || {}), $lte: Number(max_precio) };

    // Poblar todos los platos relacionados para filtrar por alérgenos
    const menus = await strapi.documents('api::menu-diario.menu-diario').findMany({
      populate: {
        Primero: { populate: { Alergeno: true } },
        Segundo: { populate: { Alergeno: true } },
        Postre: { populate: { Alergeno: true } },
      },
      filters,
    });

    let resultado = menus;
    if (excluir_alergenos) {
      const excluir = String(excluir_alergenos).split(',').map((a) => a.trim().toLowerCase());
      resultado = menus.filter((menu: any) => {
        const platos = [menu.Primero, menu.Segundo, menu.Postre].filter(Boolean);
        // Si algún plato tiene un alérgeno a excluir, se descarta el menú
        return !platos.some((plato: any) =>
          (plato.Alergeno || []).some((alergeno: any) =>
            excluir.includes((alergeno.nombre || alergeno.Nombre || '').toLowerCase())
          )
        );
      });
    }

    ctx.body = { menus: resultado };
  },
});
