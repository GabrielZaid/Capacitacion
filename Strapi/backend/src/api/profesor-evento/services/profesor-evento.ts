import { factories } from '@strapi/strapi';


interface Profesor{
    id: number | string;
    nombre: string;
}

interface Evento {
    id: number | string;
    documentId: string;
    title?: string;
    descripcion?: string;
    detalles?: {
        fecha: string;
        lugar: string;
    };
    profesors?: Profesor[];
    createdAt?: string;
    updatedAt?: string;
    publishedAt?: string;
    locale?: string;
}

interface ServiceResponse<T> {
    data: T;
    message: string;
    success: boolean;
    statusCode: number;
    count?: number; 
}


export default factories.createCoreService('api::profesor-evento.profesor-evento', ({ strapi }) => ({

   async getEventosByProfesorName(nombreProfesor: string): Promise<ServiceResponse<Evento[]>> {

       if(!nombreProfesor || typeof nombreProfesor !== 'string') { // Validación del campo nombreProfesor para saber si existe y es una cadena de texto
           return Promise.resolve({
               success: false,
               message: 'El "nombre del profesor" es requerido',
               data: [],
               statusCode: 400
           });
       }

       const eventos = await strapi.entityService.findMany('api::evento.evento', {
           filters: {
               profesors: {
                   nombre: {
                       $eq: nombreProfesor
                   }
               }
           },
           populate: {
               profesors: true,
               detalles: true
           }
       });

       return {
           success: true,
           message: 'Eventos encontrados',
           data: eventos as Evento[],
           statusCode: 200,
           count: eventos.length
       };
   }

}));
