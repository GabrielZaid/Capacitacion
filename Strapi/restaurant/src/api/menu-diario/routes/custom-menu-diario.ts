export default [
  {
    method: 'GET',
    path: '/menus/postres',
    handler: 'api::menu-diario.menu-diario.getPostres',
    config: {
      auth: false, // Ruta pública
    },
  },
  {
    method: 'GET',
    path: '/menus',
    handler: 'api::menu-diario.menu-diario.getMenusByPrecio',
    config: {
      auth: false, // Ruta pública
    },
  },
  {
    method: 'GET',
    path: '/menus/filtrar',
    handler: 'api::menu-diario.menu-diario.filtrarMenus',
    config: {
      auth: false, // Ruta pública
    },
  },
  {
    method: 'GET',
    path: '/platos/populares',
    handler: 'api::menu-diario.menu-diario.getPlatosPopulares',
    config: {
      auth: false, // Ruta pública
    },
  }
]; 