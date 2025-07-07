// Servicio personalizado para Menú Diario en TypeScript

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

export default factories.createCoreService('api::menu-diario.menu-diario', ({ strapi }) => ({
  
})); 