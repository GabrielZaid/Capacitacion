/**
 * clase controller
 * Este controlador solo maneja las peticiones HTTP y delega la lógica de negocio al Service
 */

import { factories } from '@strapi/strapi';

interface AsignarProfesorRequest {
  nombreClase: string;
  profesorId: string;
}

export default factories.createCoreController('api::clase.clase', ({ strapi }) => ({

  /**
   * POST /api/clases/asignar-profesor
   * Controller que maneja la petición HTTP y delega al Service
   */
  async asignarProfesorByClase(ctx) {
    try {
      // Extraer parámetros de la petición
      const { nombreClase, profesorId } = ctx.request.body as AsignarProfesorRequest;
    
      
      // Llamar al service con la lógica de negocio
      const serviceResponse = await strapi.service('api::clase.clase').asignarProfesor(nombreClase, profesorId);
      
      // Manejar la respuesta basada en el statusCode del service
      switch (serviceResponse.statusCode) {
        case 200:
          ctx.status = 200;
          ctx.body = {
            success: serviceResponse.success,
            message: serviceResponse.message,
            data: serviceResponse.data
          };
          return;
          
        case 400:
          ctx.status = 400;
          ctx.body = {
            success: serviceResponse.success,
            message: serviceResponse.message,
            data: serviceResponse.data
          };
          return;
          
        case 404:
          console.log('Clase no encontrada:', serviceResponse.message);
          ctx.status = 404;
          ctx.body = {
            success: serviceResponse.success,
            message: serviceResponse.message,
            data: serviceResponse.data
          };
          return;
          
        case 500:
        default:
          ctx.status = 500;
          ctx.body = {
            success: serviceResponse.success,
            message: serviceResponse.message,
            data: serviceResponse.data,
            error: process.env.NODE_ENV === 'development' ? 'Error en el service' : undefined
          };
          return;
      }

    } catch (error) {
      strapi.log.error('Error en Controller asignarProfesor:', error);
      ctx.status = 500;
      ctx.body = {
        success: false,
        message: 'Error interno del servidor',
        data: null,
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      };
      return;
    }
  },


}));
