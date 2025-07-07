/**
 * clase controller
 * Este controlador maneja las peticiones HTTP y delega la lógica de negocio al Service
 */

import { factories } from '@strapi/strapi';
import { sanitize, validate } from '@strapi/utils';

interface AsignarProfesorRequest {
  nombreClase: string;
  profesorId: string;
}

export default factories.createCoreController('api::clase.clase', ({ strapi }) => ({

  /**
   * POST /api/clases/asignar-profesor-by-clase
   * Controller que maneja la petición HTTP y delega al Service
   */
  async asignarProfesorByClase(ctx) {
    try {
      // Validar y sanitizar la entrada
      const contentType = strapi.contentType('api::clase.clase');
      
      // Extraer parámetros de la petición
      const { nombreClase, profesorId } = ctx.request.body as AsignarProfesorRequest;
      
      // Validación básica de entrada
      if (!nombreClase || !profesorId) {
        ctx.status = 400;
        ctx.body = {
          success: false,
          message: 'Se requieren los campos nombreClase y profesorId',
          data: null
        };
        return;
      }

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
          ctx.status = 404;
          ctx.body = {
            success: serviceResponse.success,
            message: serviceResponse.message,
            data: serviceResponse.data
          };
          return;
          
        case 409:
          ctx.status = 409;
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
