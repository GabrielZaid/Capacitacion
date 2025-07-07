/**
 * Custom clase routes
 */

export default {
  routes: [
    {
      method: 'POST',
      path: '/clases/asignar-profesor-by-clase',
      handler: 'api::clase.clase.asignarProfesorByClase',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
};
