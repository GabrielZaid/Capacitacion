export default {
  routes: [
    {
      method: 'GET', // Metodo HTTP
      path: '/profesor-eventos/by-name', // Ruta de la API
      handler: 'api::profesor-evento.profesor-evento.getEventosByProfesorName', // Nombre del controlador y método
      config: { 
        policies: [], // Políticas de seguridad (opcional)
        middlewares: [], // Middlewares (opcional)
        auth: false, // Permitir acceso público
      },
    },
  ],
};
