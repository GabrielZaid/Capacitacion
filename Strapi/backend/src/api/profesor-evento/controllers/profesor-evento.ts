/**
 * profesorEvento controller
 * Este controlador solo maneja las peticiones HTTP y delega la lógica de negocio al Service estamos utilizando el patrón de diseño 
 * Controller-Service para separar las responsabilidades
 */

import { factories } from '@strapi/strapi';

interface ProfesorEventoRequest {
  nombreProfesor?: string;
}

export default {

  /**
   * GET /api/profesor-eventos/by-name
   * Controller que maneja la petición HTTP y delega al Service
   */

  async getEventosByProfesorName(ctx) {
    try {
      // Extraer parámetros de la petición
      const { nombreProfesor } = ctx.request.query as ProfesorEventoRequest;
      
      // Llamar al service con la lógica de negocio
      const serviceResponse = await strapi.service('api::profesor-evento.profesor-evento').getEventosByProfesorName(nombreProfesor);
      
      // Manejar la respuesta basada en el statusCode del service
      switch (serviceResponse.statusCode) {
        case 200:
          return ctx.send({
            success: serviceResponse.success,
            message: serviceResponse.message,
            data: serviceResponse.data,
            count: serviceResponse.count
          });
          
        case 400:
          return ctx.badRequest({
            success: serviceResponse.success,
            message: serviceResponse.message,
            data: serviceResponse.data
          });
          
        case 404:
          return ctx.notFound({
            success: serviceResponse.success,
            message: serviceResponse.message,
            data: serviceResponse.data
          });
          
        case 500:
        default:
          return ctx.internalServerError({
            success: serviceResponse.success,
            message: serviceResponse.message,
            data: serviceResponse.data,
            error: process.env.NODE_ENV === 'development' ? 'Error en el service' : undefined
          });
      }

    } catch (error) {
      strapi.log.error('Error en Controller getEventosByProfesorName:', error);
      return ctx.internalServerError({
        success: false,
        message: 'Error interno del servidor',
        data: null,
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },

};
