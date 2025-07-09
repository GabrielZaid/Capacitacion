import { factories } from '@strapi/strapi';
import { 
  ERROR_MESSAGES, 
  SUCCESS_MESSAGES, 
  API_ROUTES, 
  FIELD_NAMES, 
  QUERY_PARAMS 
} from '../../../../constants/menu-diario/const';
import { Context } from 'koa';
import { SENSITIVE_FIELDS } from '../../../../constants/global';

function sanitizeData<T>(data: T): T {
  if (Array.isArray(data)) {
    return data.map(sanitizeData) as T;
  }
  if (data && typeof data === 'object') {
    const sanitized = { ...data };
    SENSITIVE_FIELDS.forEach(field => {
      if (field in sanitized) delete sanitized[field];
    });
    Object.keys(sanitized).forEach(key => {
      if (typeof sanitized[key] === 'object') {
        sanitized[key] = sanitizeData(sanitized[key]);
      }
    });
    return sanitized as T;
  }
  return data as T;
}

function extractDesserts(menus: any[]): any[] {
  return menus
    .map(menu => menu?.[FIELD_NAMES.DESSERT])
    .filter(Boolean);
}

function buildPriceFilter(min?: string, max?: string): Record<string, any> {
  const filter: Record<string, any> = {};
  if (min) filter[FIELD_NAMES.PRICE] = { $gte: Number(min) };
  if (max) filter[FIELD_NAMES.PRICE] = { ...filter[FIELD_NAMES.PRICE], $lte: Number(max) };
  return filter;
}

function buildSumPriceFilter(min?: string, max?: string): Record<string, any> {
  const filter: Record<string, any> = {};
  if (min) filter[FIELD_NAMES.TOTAL_PRICE] = { ...(filter[FIELD_NAMES.TOTAL_PRICE] || {}), $gte: Number(min) };
  if (max) filter[FIELD_NAMES.TOTAL_PRICE] = { ...(filter[FIELD_NAMES.TOTAL_PRICE] || {}), $lte: Number(max) };
  return filter;
}

function excludeMenusByAllergens(menus: any[], allergens: string[]): any[] {
  const exclude = allergens.map(a => a.trim().toLowerCase());
  return menus.filter(menu => {
    const plates = [menu[FIELD_NAMES.FIRST], menu[FIELD_NAMES.SECOND], menu[FIELD_NAMES.DESSERT]].filter(Boolean);
    return !plates.some(plate =>
      (plate[FIELD_NAMES.ALLERGEN] || []).some((allergen: any) =>
        exclude.includes((allergen[FIELD_NAMES.ALLERGEN_NAME] || '').toLowerCase())
      )
    );
  });
}

export default factories.createCoreController('api::menu-diario.menu-diario', ({ strapi }) => ({

  async getDesserts(ctx: Context) {
    try {
      const menus = await strapi.documents(API_ROUTES.MENU_DIARIO).findMany({
        populate: { [FIELD_NAMES.DESSERT]: true },
      });
      ctx.body = sanitizeData(extractDesserts(menus));
    } catch (error: any) {
      ctx.status = error.status || 500;
      ctx.body = {
        data: null,
        error: {
          status: ctx.status,
          name: error.name || 'InternalServerError',
          message: error.message || ERROR_MESSAGES.MENU_NOT_FOUND,
          details: error.details || {},
        },
      };
    }
  },

  async getMenusByPrice(ctx: Context) {
    try {
      const min_price = ctx.query.min_precio as string | undefined;
      const max_price = ctx.query.max_precio as string | undefined;
      const filters = buildPriceFilter(min_price, max_price);
      const menus = await strapi.documents(API_ROUTES.MENU_DIARIO).findMany({
        filters,
      });
      ctx.body = sanitizeData(menus);
    } catch (error: any) {
      ctx.status = error.status || 500;
      ctx.body = {
        data: null,
        error: {
          status: ctx.status,
          name: error.name || 'InternalServerError',
          message: error.message || 'Error filtering menus by price',
          details: error.details || {},
        },
      };
    }
  },

  async filterMenus(ctx: Context) {
    try {
      const min_price = ctx.query.min_precio as string | undefined;
      const max_price = ctx.query.max_precio as string | undefined;
      const exclude_allergens = ctx.query.excluir_alergenos as string | undefined;
      const filters = buildSumPriceFilter(min_price, max_price);
      const menus = await strapi.documents(API_ROUTES.MENU_DIARIO).findMany({
        populate: {
          [FIELD_NAMES.FIRST]: { populate: { [FIELD_NAMES.ALLERGEN]: true } },
          [FIELD_NAMES.SECOND]: { populate: { [FIELD_NAMES.ALLERGEN]: true } },
          [FIELD_NAMES.DESSERT]: { populate: { [FIELD_NAMES.ALLERGEN]: true } },
        },
        filters,
      });
      let result = menus;
      if (typeof exclude_allergens === 'string') {
        const allergens = exclude_allergens.split(',');
        result = excludeMenusByAllergens(menus, allergens);
      }
      ctx.body = { menus: sanitizeData(result) };
    } catch (error: any) {
      ctx.status = error.status || 500;
      ctx.body = {
        data: null,
        error: {
          status: ctx.status,
          name: error.name || 'InternalServerError',
          message: error.message || 'Error filtering menus by allergens',
          details: error.details || {},
        },
      };
    }
  },

  async getPopularPlates(ctx: Context) {
    try {
      const min_appearances = ctx.query.min_apariciones as string | undefined;
      const menus = await strapi.documents(API_ROUTES.MENU_DIARIO).findMany({
        populate: { [FIELD_NAMES.FIRST]: true, [FIELD_NAMES.SECOND]: true, [FIELD_NAMES.DESSERT]: true },
      });
      const counter: Record<string, { plate: any, appearances: number }> = {};
      for (const menu of menus) {
        [FIELD_NAMES.FIRST, FIELD_NAMES.SECOND, FIELD_NAMES.DESSERT].forEach(type => {
          const plate = (menu as any)[type];
          if (plate && plate.id) {
            const id = String(plate.id);
            if (!counter[id]) {
              counter[id] = { plate, appearances: 1 };
            } else {
              counter[id].appearances += 1;
            }
          }
        });
      }
      let popular = Object.values(counter)
        .sort((a, b) => b.appearances - a.appearances);
      if(min_appearances){
        popular = popular.filter(plate => plate.appearances >= Number(min_appearances));
      }
      ctx.body = sanitizeData(popular);
    } catch (error: any) {
      ctx.status = error.status || 500;
      ctx.body = {
        data: null,
        error: {
          status: ctx.status,
          name: error.name || 'InternalServerError',
          message: error.message || 'Error getting popular plates',
          details: error.details || {},
        },
      };
    }
  }

}));
