import { API_ROUTES } from '../../../../constants/menu-diario/const';

export default [
  {
    method: 'GET',
    path: '/menus/postres',
    handler: 'api::menu-diario.menu-diario.getDesserts',
    config: {
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/menus',
    handler: 'api::menu-diario.menu-diario.getMenusByPrice',
    config: {
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/menus/filtrar',
    handler: 'api::menu-diario.menu-diario.filterMenus',
    config: {
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/platos/populares',
    handler: 'api::menu-diario.menu-diario.getPopularPlates',
    config: {
      auth: false,
    },
  }
]; 