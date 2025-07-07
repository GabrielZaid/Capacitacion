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

export default factories.createCoreService('api::clase.clase', ({ strapi }) => ({


  async asignarProfesor(nombreClase: string, profesorId: string): Promise<ServiceResponse<any>> {
    try {
      if (!nombreClase?.trim()) {
        return {
          success: false,
          message: 'El nombre de la clase es requerido y no puede estar vacío',
          data: null,
          statusCode: 400
        };
      }

      if (!profesorId?.trim()) {
        return {
          success: false,
          message: 'El ID del profesor es requerido y no puede estar vacío',
          data: null,
          statusCode: 400
        };
      }

      // Buscar la clase por nombre (búsqueda exacta primero, luego parcial) usando Document Service API
      let clase = await strapi.documents('api::clase.clase').findMany({
        filters: {
          titulo: {
            $eq: nombreClase.trim()
          }
        },
        populate: {
          profesors: {
            fields: ['id', 'nombre', 'apellido', 'correo_electronico']
          }
        }
      });

      // Si no se encuentra con búsqueda exacta, intentar búsqueda parcial
      if (!clase || clase.length === 0) {
        clase = await strapi.documents('api::clase.clase').findMany({
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
      }

      if (!clase || clase.length === 0) {
        return {
          success: false,
          message: `No se encontró ninguna clase con el nombre "${nombreClase}"`,
          data: null,
          statusCode: 404
        };
      }

      // Si hay múltiples clases, tomar la primera
      const claseEncontrada = clase[0] as any;

      // Buscar el profesor usando Document Service API
      const profesor = await strapi.documents('api::profesor.profesor').findOne({
        documentId: profesorId
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
      const profesorYaAsignado = claseEncontrada.profesors?.some((p: any) => p.id === profesorId || p.documentId === profesorId);

      if (profesorYaAsignado) {
        return {
          success: false,
          message: `El profesor ${profesor.nombre} ${profesor.apellido} ya está asignado a la clase "${claseEncontrada.titulo}"`,
          data: {
            clase: {
              id: claseEncontrada.id,
              titulo: claseEncontrada.titulo,
              profesors: claseEncontrada.profesors
            }
          },
          statusCode: 409 // El codigo de estado 409 es para conflictos
        };
      }

      let claseActualizada: any = null;
      try {
        claseActualizada = await strapi.documents('api::clase.clase').update({
          documentId: claseEncontrada.documentId,
          data: {
            profesors: {
              connect: [profesorId]
            }
          }
        }) as any;
        if (!claseActualizada) {
          throw new Error('La actualización devolvió null');
        }
      } catch (err) {
        strapi.log.error('Error al actualizar la clase:', err);
        return {
          success: false,
          message: 'No se pudo actualizar la clase. Verifica los datos enviados.',
          data: null,
          statusCode: 500
        };
      }

      // Respuesta exitosa
      return {
        success: true,
        message: `El profesor ${profesor.nombre} ${profesor.apellido} ha sido asignado exitosamente a la clase "${claseEncontrada.titulo}"`,
        data: {
          clase: {
            id: claseActualizada.id,
            titulo: claseActualizada.titulo,
            profesors: claseActualizada.profesors,
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


  async asignarProfesorConValidaciones(claseId, profesorId, limiteClases = 5, limiteProfesores = 3) {
    // 1. Obtener la clase y los profesores asignados
    const clase = await strapi.documents('api::clase.clase').findOne({
      documentId: claseId,
      populate: { profesors: true }
    });

    if (!clase) {
      return { success: false, message: 'Clase no encontrada' };
    }

    // 2. Validar límite de profesores en la clase
    if (clase.profesors && clase.profesors.length >= limiteProfesores) {
      return { success: false, message: `La clase ya tiene el máximo de ${limiteProfesores} profesores asignados.` };
    }

    // 3. Obtener el profesor y sus clases activas
    const profesor = await strapi.documents('api::profesor.profesor').findOne({
      documentId: profesorId,
      populate: { clases: true }
    });

    if (!profesor) {
      return { success: false, message: 'Profesor no encontrado' };
    }

    // 4. Validar límite de clases activas del profesor
    const clasesActivas = profesor.clases ? profesor.clases.length : 0;
    if (clasesActivas >= limiteClases) {
      return { success: false, message: `El profesor ya tiene el máximo de ${limiteClases} clases activas.` };
    }

    // 5. Asignar el profesor a la clase
    const claseActualizada = await strapi.documents('api::clase.clase').update({
      documentId: claseId,
      data: {
        profesors: {
          connect: [profesorId]
        }
      }
    });

    // 6. Enviar notificación automática (usando el plugin de email)
    try {
      await strapi.plugin('email').service('email').send({
        to: profesor.correo_electronico,
        from: 'notificaciones@tusitio.com',
        subject: 'Nueva asignación de clase',
        text: `Has sido asignado a la clase: ${clase.titulo}`,
        html: `<p>Has sido asignado a la clase: <strong>${clase.titulo}</strong></p>`
      });
    } catch (err) {
      strapi.log.error('Error enviando email de notificación:', err);
    }

    return {
      success: true,
      message: 'Profesor asignado exitosamente y notificación enviada.',
      data: claseActualizada
    };
  },

}));
