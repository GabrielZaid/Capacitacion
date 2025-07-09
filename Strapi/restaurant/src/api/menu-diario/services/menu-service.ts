import { factories } from '@strapi/strapi';
import { errors } from '@strapi/utils';
import { Plate, MenuType, DailyMenu, TotalCalculation, CalculateTotalParams } from '../../../../type/menu-diario';
import { 
  ERROR_MESSAGES, 
  API_ROUTES, 
  FIELD_NAMES, 
  TAX_RATE, 
  PLATE_CATEGORIES 
} from '../../../../constants/menu-diario/const';

export default factories.createCoreService('api::menu-diario.menu-diario', ({ strapi }) => ({
  validateUniquePlates(firstId?: number | string, secondId?: number | string, dessertId?: number | string) {
    const ids = [firstId, secondId, dessertId].filter(Boolean);
    const set = new Set(ids);
    if (set.size !== ids.length) {
      throw new errors.ApplicationError(ERROR_MESSAGES.DUPLICATE_PLATES);
    }
  },

  extractIdFromRelation(value: any): number | undefined {
    if (!value) return undefined;
    if (Array.isArray(value) && value.length > 0 && value[0].id) {
      return value[0].id;
    }
    if (typeof value === 'object' && value.connect) {
      if (Array.isArray(value.connect) && value.connect.length > 0 && value.connect[0].documentId) {
        return value.connect[0].documentId;
      }
      if (value.connect.documentId) {
        return value.connect.documentId;
      }
    }
    if (typeof value === 'string' || typeof value === 'number') {
      return Number(value);
    }
    return undefined;
  },

  extractPrice(plate: any): number {
    if (!plate) return 0;
    if (typeof plate[FIELD_NAMES.PRICE] === 'object') {
      const price = plate[FIELD_NAMES.PRICE].es || plate[FIELD_NAMES.PRICE].en || plate[FIELD_NAMES.PRICE].fr || 
                     plate[FIELD_NAMES.PRICE].de || plate[FIELD_NAMES.PRICE].it || plate[FIELD_NAMES.PRICE].pt ||
                     Object.values(plate[FIELD_NAMES.PRICE])[0];
      return Number(price) || 0;
    }
    return Number(plate[FIELD_NAMES.PRICE]) || 0;
  },

  async findPlateById(id: string | number | undefined): Promise<Plate | null> {
    if (!id) return null;
    try {
      const plate = await strapi.documents(API_ROUTES.PLATO).findOne({ documentId: String(id) });
      if (plate) {
        return plate;
      }
      return null;
    } catch (error) {
      console.error(`Error searching plate with ID ${id}:`, error);
      return null;
    }
  },

  async getMenuTypes(currentMenu: DailyMenu | null, data: any): Promise<MenuType[]> {
    try {
      const existingTypes = currentMenu?.[FIELD_NAMES.MENU_TYPES] || [];
      let newTypes: MenuType[] = [];
      if (data[FIELD_NAMES.MENU_TYPES]) {
        if (Array.isArray(data[FIELD_NAMES.MENU_TYPES])) {
          const typeIds = data[FIELD_NAMES.MENU_TYPES].map((type: any) => 
            typeof type === 'object' ? type.id : type
          ).filter(Boolean);
          if (typeIds.length > 0) {
            newTypes = await strapi.documents(API_ROUTES.TIPO_MENU).findMany({
              filters: { id: { $in: typeIds } }
            });
          }
        } else if (typeof data[FIELD_NAMES.MENU_TYPES] === 'object' && data[FIELD_NAMES.MENU_TYPES].connect) {
          const typeIds = Array.isArray(data[FIELD_NAMES.MENU_TYPES].connect) 
            ? data[FIELD_NAMES.MENU_TYPES].connect.map((t: any) => t.id)
            : [data[FIELD_NAMES.MENU_TYPES].connect.id];
          if (typeIds.length > 0) {
            newTypes = await strapi.documents(API_ROUTES.TIPO_MENU).findMany({
              filters: { id: { $in: typeIds } }
            });
          }
        }
      }
      const allTypes = [...existingTypes, ...newTypes];
      const uniqueTypes = allTypes.filter((type, index, self) => 
        self.findIndex(t => t.id === type.id) === index
      );
      return uniqueTypes;
    } catch (error) {
      console.error("Error getting menu types:", error);
      return [];
    }
  },

  async getCurrentDailyMenu(documentId: string): Promise<DailyMenu | null> {
    try {
      const currentMenu = await strapi.documents(API_ROUTES.MENU_DIARIO).findOne({
        documentId,
        populate: {
          [FIELD_NAMES.FIRST]: true,
          [FIELD_NAMES.SECOND]: true,
          [FIELD_NAMES.DESSERT]: true,
          [FIELD_NAMES.MENU_TYPES]: true
        }
      });
      return currentMenu;
    } catch (error) {
      console.error("Error getting current daily menu:", error);
      return null;
    }
  },

  calculateAverageTax(menuTypes: MenuType[]): number {
    if (!menuTypes || menuTypes.length === 0) {
      return TAX_RATE.DEFAULT;
    }
    const taxes = menuTypes
      .map(type => Number(type.Tax_Rate) || 0)
      .filter(tax => tax > 0);
    if (taxes.length === 0) {
      return TAX_RATE.DEFAULT;
    }
    const averageTax = taxes.reduce((sum, tax) => sum + tax, 0) / taxes.length;
    return averageTax;
  },

  async calculatePlatePrice(id: number | string | undefined, type: string): Promise<number> {
    if (!id) return 0;
    const plate = await this.findPlateById(id);
    const price = this.extractPrice(plate);
    return price;
  },

  async calculateTotalSum(firstId?: number, secondId?: number, dessertId?: number): Promise<number> {
    const firstPrice = await this.calculatePlatePrice(firstId, PLATE_CATEGORIES.FIRST);
    const secondPrice = await this.calculatePlatePrice(secondId, PLATE_CATEGORIES.SECOND);
    const dessertPrice = await this.calculatePlatePrice(dessertId, PLATE_CATEGORIES.DESSERT);
    const totalSum = firstPrice + secondPrice + dessertPrice;
    return totalSum;
  },

  getIdsForCalculation(data: any, currentMenu: any) {
    const newFirstId = this.extractIdFromRelation(data[FIELD_NAMES.FIRST]);

    const newSecondId = this.extractIdFromRelation(data[FIELD_NAMES.SECOND]);

    const newDessertId = this.extractIdFromRelation(data[FIELD_NAMES.DESSERT]);

    const existingFirstId = currentMenu?.[FIELD_NAMES.FIRST]?.documentId;
    const existingSecondId = currentMenu?.[FIELD_NAMES.SECOND]?.documentId;
    const existingDessertId = currentMenu?.[FIELD_NAMES.DESSERT]?.documentId;
    const firstId = newFirstId || existingFirstId;
    const secondId = newSecondId || existingSecondId;
    const dessertId = newDessertId || existingDessertId;



    return { firstId, secondId, dessertId };
  },

  async calculateTotalWithTax({ firstId, secondId, dessertId, menuType }: CalculateTotalParams): Promise<TotalCalculation> {
    this.validateUniquePlates(firstId, secondId, dessertId);
    const subtotal = await this.calculateTotalSum(
      Number(firstId), 
      Number(secondId), 
      Number(dessertId)
    );
    const taxRate = TAX_RATE.STANDARD;
    const tax = subtotal * taxRate;
    const total = subtotal + tax;
    return {
      subtotal,
      tax,
      total
    };
  },

  async processMenuCreation(data: any): Promise<{ subtotal: number; impuesto: number; total: number }> {
    const firstId = this.extractIdFromRelation(data[FIELD_NAMES.FIRST]);
    const secondId = this.extractIdFromRelation(data[FIELD_NAMES.SECOND]);
    const dessertId = this.extractIdFromRelation(data[FIELD_NAMES.DESSERT]);
    this.validateUniquePlates(firstId, secondId, dessertId);
    const subtotal = await this.calculateTotalSum(firstId, secondId, dessertId);
    const menuTypes = await this.getMenuTypes(null, data);
    const taxRate = this.calculateAverageTax(menuTypes);
    const tax = subtotal * taxRate;
    const total = subtotal + tax;
    return { subtotal, impuesto: tax, total };
  },

  async processMenuUpdate(data: any): Promise<{ subtotal: number; impuesto: number; total: number }> {
    const currentMenu = await this.getCurrentDailyMenu(data.documentId);
    const { firstId, secondId, dessertId } = this.getIdsForCalculation(data, currentMenu);
   
    this.validateUniquePlates(firstId, secondId, dessertId);
    const subtotal = await this.calculateTotalSum(firstId, secondId, dessertId);
    const menuTypes = await this.getMenuTypes(currentMenu, data);
    const taxRate = this.calculateAverageTax(menuTypes);
    const tax = subtotal * taxRate;
    const total = subtotal + tax;
    return { subtotal, impuesto: tax, total };
  }
})); 