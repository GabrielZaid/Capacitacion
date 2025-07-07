/**
 * clase router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::clase.clase', {
  config: {
    find: {
      middlewares: [],
    },
    findOne: {
      middlewares: [],
    },
    create: {
      middlewares: [],
    },
    update: {
      middlewares: [],
    },
    delete: {
      middlewares: [],
    },
  },
});
