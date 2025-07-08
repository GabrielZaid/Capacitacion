export default {
  async beforeCreate(event: any) {
    // console.log("=== beforeCreate iniciado ===");
    const data = event.params.data;
    // console.log("Data original:", JSON.stringify(data, null, 2));
    
    const menuService = strapi.service('api::menu-diario.menu-service');
    const { subtotal, impuesto, total } = await menuService.procesarCreacionMenu(data);
    
    // Guardar valores calculados
    data.Precio = subtotal;        // Total sin impuestos
    data.Sum_Precio = total;       // Total con impuestos
    data.IVA = impuesto;           // Monto del impuesto
    
    // console.log("Cálculos:", { subtotal, impuesto, total });
    // console.log("Data final:", JSON.stringify(data, null, 2));
    // console.log("=== beforeCreate terminado ===");
  },

  async beforeUpdate(event: any) {
    // console.log("=== beforeUpdate iniciado ===");
    const data = event.params.data;
    // console.log("Data original:", JSON.stringify(data, null, 2));
    
    const menuService = strapi.service('api::menu-diario.menu-service');
    const { subtotal, impuesto, total } = await menuService.procesarActualizacionMenu(data);
    
    // Guardar valores calculados
    data.Precio = subtotal;        // Total sin impuestos
    data.Sum_Precio = total;       // Total con impuestos
    data.IVA = impuesto;           // Monto del impuesto
    
    // console.log("Cálculos:", { subtotal, impuesto, total });
    // console.log("Data final:", JSON.stringify(data, null, 2));
    // console.log("=== beforeUpdate terminado ===");
  },
};