export default {
  async beforeCreate(event: any) {
    // console.log("=== beforeCreate iniciado ===");
    const data = event.params.data;
    // console.log("Data original:", JSON.stringify(data, null, 2));
    
  
    const menuService = strapi.service('api::menu-diario.menu-service');
    const sumaTotal = await menuService.procesarCreacionMenu(data);

    
    data.Sum_Precio = sumaTotal;
    // console.log("Data final:", JSON.stringify(data, null, 2));
    // console.log("=== beforeCreate terminado ===");
  },

  async beforeUpdate(event: any) {
    // console.log("=== beforeUpdate iniciado ===");
    const data = event.params.data;
    // console.log("Data original:", JSON.stringify(data, null, 2));
    
    const menuService = strapi.service('api::menu-diario.menu-service');
    const sumaTotal = await menuService.procesarActualizacionMenu(data); 
    
    data.Sum_Precio = sumaTotal;
    // console.log("Data final:", JSON.stringify(data, null, 2));
    // console.log("=== beforeUpdate terminado ===");
  },
};