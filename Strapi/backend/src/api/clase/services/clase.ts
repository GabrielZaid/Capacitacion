/**
 * clase service
 */

import { factories } from '@strapi/strapi';

interface ServiceResponse<T> {
  data: T;
  message: string;
  success: boolean;
  statusCode: number;
}

interface AsignarProfesorRequest {
  nombreClase: string;
  profesorId: string;
}

export default factories.createCoreService('api::clase.clase', ({ strapi }) => ({

  /**
   * Asigna un profesor a una clase específica
   */
  async asignarProfesor(nombreClase: string, profesorId: string): Promise<ServiceResponse<any>> {
    try {
      // Validación de entrada
      if (!nombreClase || typeof nombreClase !== 'string') {
        return {
          success: false,
          message: 'El "nombre de la clase" es requerido ',
          data: null,
          statusCode: 400
        };
      }

      if (!profesorId || typeof profesorId !== 'string') {
        return {
          success: false,
          message: 'El "id del profesor" es requerido ',
          data: null,
          statusCode: 400
        };
      }


      // Buscar la clase por nombre
      const clases = await strapi.entityService.findMany('api::clase.clase', {
        filters: {
          titulo: {
            $containsi: nombreClase.trim()
          }
        },
        populate: {
          profesors: {
            fields: ['id', 'nombre', 'apellido', 'correo_electronico']
          }
        }
      });

      if (!clases || clases.length === 0) {
        return {
          success: false,
          message: `No se encontró ninguna clase con el nombre "${nombreClase}"`,
          data: null,
          statusCode: 404
        };
      }

      // Si hay múltiples clases, tomar la primera
      const clase = clases[0] as any;

      // Verificar si el profesor existe
      const profesor = await strapi.entityService.findOne('api::profesor.profesor', profesorId, {
        fields: ['id', 'nombre', 'apellido', 'correo_electronico']
      });

      if (!profesor) {
        return {
          success: false,
          message: `No se encontró el profesor con ID: ${profesorId}`,
          data: null,
          statusCode: 404
        };
      }

      // Verificar si el profesor ya está asignado a esta clase
      const profesorYaAsignado = clase.profesors?.some((p: any) => p.id === parseInt(profesorId));

      if (profesorYaAsignado) {
        return {
          success: false,
          message: `El profesor ${profesor.nombre} ${profesor.apellido} ya está asignado a la clase "${clase.titulo}"`,
          data: {
            clase: {
              id: clase.id,
              titulo: clase.titulo,
              profesors: clase.profesors
            }
          },
          statusCode: 400
        };
      }

      // Obtener los IDs de los profesores actuales
      const profesoresActuales = clase.profesors?.map((p: any) => p.id) || [];

      // Agregar el nuevo profesor
      const nuevosProfesorIds = [...profesoresActuales, parseInt(profesorId)];

      // Actualizar la clase con el nuevo profesor
      const claseActualizada = await strapi.entityService.update('api::clase.clase', clase.id, {
        data: {
          profesors: nuevosProfesorIds as any
        },
        populate: {
          profesors: {
            fields: ['id', 'nombre', 'apellido', 'correo_electronico']
          }
        }
      }) as any;

      // Respuesta exitosa
      return {
        success: true,
        message: `El profesor ${profesor.nombre} ${profesor.apellido} ha sido asignado exitosamente a la clase "${clase.titulo}"`,
        data: {
          clase: {
            id: claseActualizada.id,
            titulo: claseActualizada.titulo,
            profesors: claseActualizada.profesors
          },
          profesorAsignado: {
            id: profesor.id,
            nombre: profesor.nombre,
            apellido: profesor.apellido,
            correo_electronico: profesor.correo_electronico
          }
        },
        statusCode: 200
      };

    } catch (error) {
      strapi.log.error('Error en asignarProfesor Service:', error);
      return {
        success: false,
        message: 'Error interno del servidor al asignar profesor',
        data: null,
        statusCode: 500
      };
    }
  },


}));
