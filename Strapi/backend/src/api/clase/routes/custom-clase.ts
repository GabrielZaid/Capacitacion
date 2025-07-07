/**
 * Custom clase routes
 * Rutas personalizadas para operaciones específicas de la colección clase
 */

export default {
  routes: [
    {
      method: 'POST',
      path: '/clases/asignar-profesor-by-clase',
      handler: 'api::clase.clase.asignarProfesorByClase',
      config: {
        auth: false, // Permitir acceso sin autenticación
        policies: [],
        middlewares: [],
        description: 'Asigna un profesor a una clase específica',
        tag: {
          plugin: 'content-manager',
          name: 'Clase',
          actionType: 'create',
        },
      },
    },
  ],
};
