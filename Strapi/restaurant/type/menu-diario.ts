export type TipoMenuEnum = 'Desayuno' | 'Almuerzo' | 'Comida' | 'Merienda' | 'Cena';

export interface CalcularTotalParams {
    primeroId?: number | string;
    segundoId?: number | string;
    postreId?: number | string;
    tipoMenu: TipoMenuEnum;
  }
  
  export interface CalculoTotal {
    subtotal: number;
    impuesto: number;
    total: number;
  }
  
  export interface Plato {
    id: string | number;
    documentId: string;
    Nombre?: string;
    Precio?: number;
    Tipo?: string;
  }
  
  export interface TipoMenu {
    id: string | number;
    documentId: string;
    Tipo?: string;
    Precio_IVA?: number;
  }
  
export interface MenuDiario {
    id: string | number;
    documentId: string;
    dia?: string;
    Primero?: any;
    Segundo?: any;
    Postre?: any;
    Precio?: number;
    Sum_Precio?: number;
    IVA?: number;
    tipo_menus?: TipoMenu[];
  }
  