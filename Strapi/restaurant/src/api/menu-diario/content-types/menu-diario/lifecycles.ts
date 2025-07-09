import { API_ROUTES, FIELD_NAMES } from '../../../../../constants/menu-diario/const';

export default {
  async beforeCreate(event: any) {
    const data = event.params.data;
    const menuService = strapi.service(API_ROUTES.MENU_SERVICE);
    const { subtotal, impuesto, total } = await menuService.processMenuCreation(data);
    data[FIELD_NAMES.PRICE] = subtotal;
    data[FIELD_NAMES.TOTAL_PRICE] = total;
    data[FIELD_NAMES.TAX] = impuesto;
  },

  async beforeUpdate(event: any) {
    const data = event.params.data;

    const menuService = strapi.service(API_ROUTES.MENU_SERVICE);
    const { subtotal, impuesto, total } = await menuService.processMenuUpdate(data);

    

    data[FIELD_NAMES.PRICE] = subtotal;
    data[FIELD_NAMES.TOTAL_PRICE] = total;
    data[FIELD_NAMES.TAX] = impuesto;
  },
};