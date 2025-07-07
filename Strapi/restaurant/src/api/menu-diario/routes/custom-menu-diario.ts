export default [
  {
    method: 'GET',
    path: '/menus/postres',
        handler: 'api::menu-diario.menu-diario.getPostres',
        config: {
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/menus',
    handler: 'api::menu-diario.menu-diario.filtrarMenus',
    config: {
      auth: false,
    },
  },
]; 