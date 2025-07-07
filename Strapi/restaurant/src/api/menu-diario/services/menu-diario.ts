/**
 * menu-diario service
 */

import { factories } from '@strapi/strapi';


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

export default factories.createCoreService('api::menu-diario.menu-diario',{
    /**
   * Calcula el precio total sumando los precios de los platos y aplicando el impuesto según el tipo de menú.
   */
  async calcularTotalConImpuesto({ primeroId, segundoId, postreId, tipoMenu }: CalcularTotalParams): Promise<CalculoTotal> {
    // Obtener el servicio de platos
    const platoService = strapi.service('api::plato.plato');

    // Función para obtener el precio de un plato por ID
    async function obtenerPrecio(id?: number | string): Promise<number> {
      if (!id) return 0;
      const plato = await platoService.findOne(id);
      return plato && plato.Precio ? Number(plato.Precio) : 0;
    }

    // Obtener precios
    const [precioPrimero, precioSegundo, precioPostre] = await Promise.all([
      obtenerPrecio(primeroId),
      obtenerPrecio(segundoId),
      obtenerPrecio(postreId),
    ]);

    const subtotal = precioPrimero + precioSegundo + precioPostre;

    // Definir porcentaje de impuesto según el tipo de menú
    const impuestos: Record<TipoMenu, number> = {
      Desayuno: 0.05,
      Almuerzo: 0.10,
      Comida: 0.15,
      Merienda: 0.20,
      Cena: 0.25,
    };
    const porcentaje = impuestos[tipoMenu] || 0;
    const impuesto = subtotal * porcentaje;
    const total = subtotal + impuesto;

    return {
      subtotal,
      impuesto,
      total,
    };
  },
});
