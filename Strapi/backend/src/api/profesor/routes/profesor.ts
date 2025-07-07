/**
 * profesor router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::profesor.profesor');


/**
 * Crea una api de tipo GET, que al pasar el nombre del profesor devuelva todos los eventos que tiene asignados.
 */
