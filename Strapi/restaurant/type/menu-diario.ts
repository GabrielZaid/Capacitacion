export type MenuTypeEnum = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack' | 'Supper';

export interface CalculateTotalParams {
    firstId?: number | string;
    secondId?: number | string;
    dessertId?: number | string;
    menuType: MenuTypeEnum;
  }
  
  export interface TotalCalculation {
    subtotal: number;
    tax: number;
    total: number;
  }
  
  export interface Plate {
    id: string | number;
    documentId: string;
    Name?: string;
    Price?: number;
    Type?: string;
  }
  
  export interface MenuType {
    id: string | number;
    documentId: string;
    Type?: string;
    Tax_Rate?: number;
  }
  
export interface DailyMenu {
    id: string | number;
    documentId: string;
    day?: string;
    First?: any;
    Second?: any;
    Dessert?: any;
    Price?: number;
    Total_Price?: number;
    Tax?: number;
    menu_types?: MenuType[];
  }
  