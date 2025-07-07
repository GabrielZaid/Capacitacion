import { errors } from '@strapi/utils';

function validarPlatosUnicos(primeroId?: number | string, segundoId?: number | string, postreId?: number | string) {
  const ids = [primeroId, segundoId, postreId].filter(Boolean);
  const set = new Set(ids);
  if (set.size !== ids.length) {
    throw new errors.ApplicationError('No se puede usar el mismo plato en varias categorías (Primero, Segundo, Postre).');
  }
}

export default {
  async beforeCreate(event: any) {
    const data = event.params.data;
    const { primero, segundo, postre, tipoMenu } = data;

    validarPlatosUnicos(primero, segundo, postre);

    const menuService = strapi.service('api::menu-diario.menu-diario');
    const resultado = await menuService.calcularTotalConImpuesto({
      primeroId: primero,
      segundoId: segundo,
      postreId: postre,
      tipoMenu,
    });
    data.sum_precio = resultado.total;
  },

  async beforeUpdate(event: any) {
    const data = event.params.data;
    if (!('primero' in data || 'segundo' in data || 'postre' in data || 'tipoMenu' in data)) {
      return;
    }
    const primero = data.primero ?? event.params.where?.primero;
    const segundo = data.segundo ?? event.params.where?.segundo;
    const postre = data.postre ?? event.params.where?.postre;
    const tipoMenu = data.tipoMenu ?? event.params.where?.tipoMenu;

    validarPlatosUnicos(primero, segundo, postre);

    const menuService = strapi.service('api::menu-diario.menu-diario');
    const resultado = await menuService.calcularTotalConImpuesto({
      primeroId: primero,
      segundoId: segundo,
      postreId: postre,
      tipoMenu,
    });
    console.log("Resultado de la actualización:", resultado);
    data.sum_precio = resultado.total;

    

  },
}; 