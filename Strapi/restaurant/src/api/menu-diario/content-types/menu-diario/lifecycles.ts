import { errors } from '@strapi/utils';

// ===== FUNCIONES DE VALIDACIÓN =====

function validarPlatosUnicos(primeroId?: number | string, segundoId?: number | string, postreId?: number | string) {
  const ids = [primeroId, segundoId, postreId].filter(Boolean);
  const set = new Set(ids);
  if (set.size !== ids.length) {
    throw new errors.ApplicationError('No se puede usar el mismo plato en varias categorías (Primero, Segundo, Postre).');
  }
}

// ===== FUNCIONES DE EXTRACCIÓN DE DATOS =====

function extraerIdDeRelacion(value: any): number | undefined {
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
}

function extraerPrecio(plato: any): number {
  if (!plato) return 0;
  
  // Si el precio es un objeto (campo localizado)
  if (typeof plato.Precio === 'object') {
    const precio = plato.Precio.es || plato.Precio.en || plato.Precio.fr || 
                   plato.Precio.de || plato.Precio.it || plato.Precio.pt ||
                   Object.values(plato.Precio)[0];
    return Number(precio) || 0;
  }
  
  return Number(plato.Precio) || 0;
}

// ===== FUNCIONES DE BÚSQUEDA =====

async function buscarPlatoPorId(id: string | number) {
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
}

async function obtenerMenuDiarioActual(documentId: string) {
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
}

// ===== FUNCIONES DE CÁLCULO =====

async function calcularPrecioPlato(id: number | string, tipo: string): Promise<number> {
  if (!id) return 0;
  
  const plato = await buscarPlatoPorId(id);
  const precio = extraerPrecio(plato);
  
  // console.log(`Precio del ${tipo} (ID: ${id}):`, precio);
  return precio;
}

async function calcularSumaTotal(primeroId?: number, segundoId?: number, postreId?: number): Promise<number> {
  const precioPrimero = await calcularPrecioPlato(primeroId, 'primero');
  const precioSegundo = await calcularPrecioPlato(segundoId, 'segundo');
  const precioPostre = await calcularPrecioPlato(postreId, 'postre');
  
  const sumaTotal = precioPrimero + precioSegundo + precioPostre;
  // console.log("Suma total de precios:", sumaTotal);
  
  return sumaTotal;
}

// ===== FUNCIONES DE PROCESAMIENTO =====

function obtenerIdsParaCalculo(data: any, menuActual: any) {
  // Extraer IDs de los datos que se están actualizando
  const nuevoPrimeroId = extraerIdDeRelacion(data.Primero);
  const nuevoSegundoId = extraerIdDeRelacion(data.Segundo);
  const nuevoPostreId = extraerIdDeRelacion(data.Postre);
  
  // console.log("IDs nuevos extraídos:", { nuevoPrimeroId, nuevoSegundoId, nuevoPostreId });
  
  // Obtener IDs de los platos existentes en el menú actual
  const existentePrimeroId = (menuActual as any)?.Primero?.id;
  const existenteSegundoId = (menuActual as any)?.Segundo?.id;
  const existentePostreId = (menuActual as any)?.Postre?.id;
  
  // console.log("IDs existentes del menú actual:", { existentePrimeroId, existenteSegundoId, existentePostreId });
  
  // Determinar qué IDs usar para el cálculo (nuevos si existen, sino usar existentes)
  const primeroId = nuevoPrimeroId || existentePrimeroId;
  const segundoId = nuevoSegundoId || existenteSegundoId;
  const postreId = nuevoPostreId || existentePostreId;
  
  // console.log("IDs finales para cálculo:", { primeroId, segundoId, postreId });
  
  return { primeroId, segundoId, postreId };
}

// ===== LIFECYCLES =====

export default {
  async beforeCreate(event: any) {
    // console.log("=== beforeCreate iniciado ===");
    const data = event.params.data;
    // console.log("Data original:", JSON.stringify(data, null, 2));
    
    const primeroId = extraerIdDeRelacion(data.Primero);
    const segundoId = extraerIdDeRelacion(data.Segundo);
    const postreId = extraerIdDeRelacion(data.Postre);

    // console.log("IDs extraídos:", { primeroId, segundoId, postreId });

    validarPlatosUnicos(primeroId, segundoId, postreId);
    const sumaTotal = await calcularSumaTotal(primeroId, segundoId, postreId);
    
    data.Sum_Precio = sumaTotal;
    // console.log("Data final:", JSON.stringify(data, null, 2));
    // console.log("=== beforeCreate terminado ===");
  },

  async beforeUpdate(event: any) {
    // console.log("=== beforeUpdate iniciado ===");
    const data = event.params.data;
    // console.log("Data original:", JSON.stringify(data, null, 2));
    
    const menuActual = await obtenerMenuDiarioActual(data.documentId);
    const { primeroId, segundoId, postreId } = obtenerIdsParaCalculo(data, menuActual);

    validarPlatosUnicos(primeroId, segundoId, postreId);
    const sumaTotal = await calcularSumaTotal(primeroId, segundoId, postreId);
    
    data.Sum_Precio = sumaTotal;
    // console.log("Data final:", JSON.stringify(data, null, 2));
    // console.log("=== beforeUpdate terminado ===");
  },
};