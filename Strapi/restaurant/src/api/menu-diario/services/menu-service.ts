// Servicio personalizado para Menú Diario en TypeScript

import { factories } from '@strapi/strapi';
import { errors } from '@strapi/utils';

type TipoMenu = 'Desayuno' | 'Almuerzo' | 'Comida' | 'Merienda' | 'Cena';

interface CalcularTotalParams {
  primeroId?: number | string;
  segundoId?: number | string;
  postreId?: number | string;
  tipoMenu: TipoMenu;
}

interface CalculoTotal {
  subtotal: number;
  impuesto: number;
  total: number;
}

interface Plato {
  id: string | number;
  documentId: string;
  Nombre?: string;
  Precio?: number;
  Tipo?: string;
}

interface MenuDiario {
  id: string | number;
  documentId: string;
  dia?: string;
  Primero?: any;
  Segundo?: any;
  Postre?: any;
  Precio?: number;
  Sum_Precio?: number;
  TipoMenu?: TipoMenu;
}

export default factories.createCoreService('api::menu-diario.menu-diario', ({ strapi }) => ({
  
  // ===== FUNCIONES DE VALIDACIÓN =====
  
  validarPlatosUnicos(primeroId?: number | string, segundoId?: number | string, postreId?: number | string) {
    const ids = [primeroId, segundoId, postreId].filter(Boolean);
    const set = new Set(ids);
    if (set.size !== ids.length) {
      throw new errors.ApplicationError('No se puede usar el mismo plato en varias categorías (Primero, Segundo, Postre).');
    }
  },

  // ===== FUNCIONES DE EXTRACCIÓN DE DATOS =====
  
  extraerIdDeRelacion(value: any): number | undefined {
    if (!value) return undefined;
    
    // console.log("extraerIdDeRelacion - valor recibido:", JSON.stringify(value, null, 2));
    
    // Si es un array de objetos con id
    if (Array.isArray(value) && value.length > 0 && value[0].id) {
      return value[0].id;
    }
    
    // Si es un objeto con connect
    if (typeof value === 'object' && value.connect) {
      if (Array.isArray(value.connect) && value.connect.length > 0 && value.connect[0].id) {
        return value.connect[0].id;
      }
      if (value.connect.id) {
        return value.connect.id;
      }
    }
    
    // Si es un string o number
    if (typeof value === 'string' || typeof value === 'number') {
      return Number(value);
    }
    
    return undefined;
  },

  extraerPrecio(plato: any): number {
    if (!plato) return 0;
    
    // Si el precio es un objeto (campo localizado)
    if (typeof plato.Precio === 'object') {
      const precio = plato.Precio.es || plato.Precio.en || plato.Precio.fr || 
                     plato.Precio.de || plato.Precio.it || plato.Precio.pt ||
                     Object.values(plato.Precio)[0];
      return Number(precio) || 0;
    }
    
    return Number(plato.Precio) || 0;
  },

  // ===== FUNCIONES DE BÚSQUEDA =====
  
  async buscarPlatoPorId(id: string | number | undefined): Promise<Plato | null> {
    if (!id) return null;
    
    try {
      // console.log(`Buscando plato con id: ${id}`);
      
      const plato = await strapi.entityService.findOne('api::plato.plato', id);
      
      if (plato) {
        // console.log(`Plato encontrado:`, plato);
        return plato;
      }
      
      // console.log(`No se encontró plato con ID: ${id}`);
      return null;
    } catch (error) {
      console.error(`Error al buscar plato con ID ${id}:`, error);
      return null;
    }
  },

  async obtenerMenuDiarioActual(documentId: string): Promise<MenuDiario | null> {
    try {
      const menuActual = await strapi.documents('api::menu-diario.menu-diario').findOne({
        documentId,
        populate: {
          Primero: true,
          Segundo: true,
          Postre: true
        }
      });
      
      // console.log("Menú diario actual encontrado:", menuActual);
      return menuActual;
    } catch (error) {
      console.error("Error al obtener menú diario actual:", error);
      return null;
    }
  },

  // ===== FUNCIONES DE CÁLCULO =====
  
  async calcularPrecioPlato(id: number | string | undefined, tipo: string): Promise<number> {
    if (!id) return 0;
    
    const plato = await this.buscarPlatoPorId(id);
    const precio = this.extraerPrecio(plato);
    
    // console.log(`Precio del ${tipo} (ID: ${id}):`, precio);
    return precio;
  },

  async calcularSumaTotal(primeroId?: number, segundoId?: number, postreId?: number): Promise<number> {
    const precioPrimero = await this.calcularPrecioPlato(primeroId, 'primero');
    const precioSegundo = await this.calcularPrecioPlato(segundoId, 'segundo');
    const precioPostre = await this.calcularPrecioPlato(postreId, 'postre');
    
    const sumaTotal = precioPrimero + precioSegundo + precioPostre;
    // console.log("Suma total de precios:", sumaTotal);
    
    return sumaTotal;
  },

  // ===== FUNCIONES DE PROCESAMIENTO =====
  
  obtenerIdsParaCalculo(data: any, menuActual: any) {
    // Extraer IDs de los datos que se están actualizando
    const nuevoPrimeroId = this.extraerIdDeRelacion(data.Primero);
    const nuevoSegundoId = this.extraerIdDeRelacion(data.Segundo);
    const nuevoPostreId = this.extraerIdDeRelacion(data.Postre);
    
    // console.log("IDs nuevos extraídos:", { nuevoPrimeroId, nuevoSegundoId, nuevoPostreId });
    
    // Obtener IDs de los platos existentes en el menú actual
    const existentePrimeroId = menuActual?.Primero?.id;
    const existenteSegundoId = menuActual?.Segundo?.id;
    const existentePostreId = menuActual?.Postre?.id;
    
    // console.log("IDs existentes del menú actual:", { existentePrimeroId, existenteSegundoId, existentePostreId });
    
    // Determinar qué IDs usar para el cálculo (nuevos si existen, sino usar existentes)
    const primeroId = nuevoPrimeroId || existentePrimeroId;
    const segundoId = nuevoSegundoId || existenteSegundoId;
    const postreId = nuevoPostreId || existentePostreId;
    
    // console.log("IDs finales para cálculo:", { primeroId, segundoId, postreId });
    
    return { primeroId, segundoId, postreId };
  },

  // ===== MÉTODOS PRINCIPALES DEL SERVICIO =====
  
  async calcularTotalConImpuesto({ primeroId, segundoId, postreId, tipoMenu }: CalcularTotalParams): Promise<CalculoTotal> {
    // Validar que no se use el mismo plato en varias categorías
    this.validarPlatosUnicos(primeroId, segundoId, postreId);
    
    // Calcular subtotal
    const subtotal = await this.calcularSumaTotal(
      Number(primeroId), 
      Number(segundoId), 
      Number(postreId)
    );
    
    // Calcular impuesto (ejemplo: 10% para todos los tipos de menú)
    const tasaImpuesto = 0.10;
    const impuesto = subtotal * tasaImpuesto;
    
    // Calcular total
    const total = subtotal + impuesto;
    
    return {
      subtotal,
      impuesto,
      total
    };
  },

  async procesarCreacionMenu(data: any): Promise<number> {
    const primeroId = this.extraerIdDeRelacion(data.Primero);
    const segundoId = this.extraerIdDeRelacion(data.Segundo);
    const postreId = this.extraerIdDeRelacion(data.Postre);

    // console.log("IDs extraídos:", { primeroId, segundoId, postreId });

    this.validarPlatosUnicos(primeroId, segundoId, postreId);
    const sumaTotal = await this.calcularSumaTotal(primeroId, segundoId, postreId);
    
    return sumaTotal;
  },

  async procesarActualizacionMenu(data: any): Promise<number> {
    const menuActual = await this.obtenerMenuDiarioActual(data.documentId);
    const { primeroId, segundoId, postreId } = this.obtenerIdsParaCalculo(data, menuActual);

    this.validarPlatosUnicos(primeroId, segundoId, postreId);
    const sumaTotal = await this.calcularSumaTotal(primeroId, segundoId, postreId);
    
    return sumaTotal;
  }
})); 