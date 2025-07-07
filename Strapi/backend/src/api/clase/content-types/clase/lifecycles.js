/**
 * Lifecycle para la colección clase
 * 
 */

module.exports = {
  

  async afterCreate(event) {
    const { result } = event;
    
    strapi.log.info(`Clase creada exitosamente: ${result.titulo} (ID: ${result.id})`);
    
  },

  async afterUpdate(event) {
    const { result } = event;
    
    strapi.log.info(`Clase actualizada exitosamente: ${result.titulo} (ID: ${result.id})`);
    
  },
};
