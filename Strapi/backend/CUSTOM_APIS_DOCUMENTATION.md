# Documentación de APIs Personalizadas - Strapi v5

## Resumen

Este documento describe las APIs personalizadas implementadas en Strapi v5 siguiendo las mejores prácticas de **separación de responsabilidades** entre controladores y servicios.

## Arquitectura Implementada

### Patrón de Diseño
- **Controladores**: Solo manejan peticiones HTTP y delegan al servicio
- **Servicios**: Contienen toda la lógica de negocio, validación y manejo de errores
- **Respuestas estructuradas**: Los servicios retornan objetos con `statusCode` para que los controladores mapeen correctamente las respuestas HTTP

### Estructura de Respuesta Estándar
```typescript
interface ServiceResponse<T> {
  data: T;
  message: string;
  success: boolean;
  statusCode: number;
  count?: number; // Para respuestas con arrays
}
```

## API 1: Eventos por Profesor (`profesorEvento`)

### Endpoints

#### 1. GET `/api/profesor-eventos/by-name`
**Descripción**: Obtiene todos los eventos asignados a un profesor dado su nombre.

**Parámetros**:
- `nombreProfesor` (query string): Nombre del profesor (búsqueda parcial, case-insensitive)

**Ejemplos**:
```http
GET http://localhost:1337/api/profesor-eventos/by-name?nombreProfesor=Leonel Andres
GET http://localhost:1337/api/profesor-eventos/by-name?nombreProfesor=leonel
```

**Respuestas**:
- **200**: Eventos encontrados
- **400**: Parámetros inválidos
- **404**: Profesor no encontrado
- **500**: Error interno

#### 2. GET `/api/profesor-eventos/by-id/:profesorId`
**Descripción**: Obtiene todos los eventos asignados a un profesor por su ID.

**Parámetros**:
- `profesorId` (path parameter): ID del profesor

**Ejemplo**:
```http
GET http://localhost:1337/api/profesor-eventos/by-id/2
```

### Archivos Implementados
- `src/api/profesorEvento/controllers/profesorEvento.ts`
- `src/api/profesorEvento/services/profesorEvento.ts`
- `src/api/profesorEvento/routes/profesorEvento.ts`

### Características Implementadas
- ✅ Búsqueda por nombre parcial (case-insensitive)
- ✅ Búsqueda por ID de profesor
- ✅ Validación robusta de entrada
- ✅ Manejo de errores completo
- ✅ Populate de relaciones (profesores, detalles, tema, material)
- ✅ Separación completa entre controlador y servicio

## API 2: Asignación de Profesores a Clases (`clase`)

### Endpoints

#### 1. POST `/api/clases/asignar-profesor`
**Descripción**: Asigna un profesor a una clase específica.

**Body**:
```json
{
  "nombreClase": "Clase IA",
  "profesorId": "2"
}
```

**Ejemplo**:
```http
POST http://localhost:1337/api/clases/asignar-profesor
Content-Type: application/json

{
  "nombreClase": "Clase IA",
  "profesorId": "2"
}
```

**Respuestas**:
- **200**: Profesor asignado exitosamente
- **400**: Parámetros inválidos o profesor ya asignado
- **404**: Clase o profesor no encontrado
- **500**: Error interno

#### 2. POST `/api/clases/desasignar-profesor`
**Descripción**: Remueve un profesor de una clase específica.

**Body**:
```json
{
  "nombreClase": "Clase IA",
  "profesorId": "2"
}
```

**Ejemplo**:
```http
POST http://localhost:1337/api/clases/desasignar-profesor
Content-Type: application/json

{
  "nombreClase": "Clase IA",
  "profesorId": "2"
}
```

### Archivos Implementados
- `src/api/clase/controllers/clase.ts`
- `src/api/clase/services/clase.ts`
- `src/api/clase/routes/clase.ts`
- `src/api/clase/content-types/clase/lifecycles.js`

### Características Implementadas
- ✅ Validación de existencia de clase y profesor
- ✅ Prevención de asignaciones duplicadas
- ✅ Manejo de relaciones many-to-many
- ✅ Lifecycle hooks para logging y validación
- ✅ Manejo robusto de errores
- ✅ Separación completa entre controlador y servicio

## Mejores Prácticas Implementadas

### 1. Separación de Responsabilidades
```typescript
// Controlador - Solo maneja HTTP
async asignarProfesor(ctx) {
  const { nombreClase, profesorId } = ctx.request.body;
  const serviceResponse = await strapi.service('api::clase.clase').asignarProfesor(nombreClase, profesorId);
  
  switch (serviceResponse.statusCode) {
    case 200: return ctx.send(serviceResponse);
    case 400: return ctx.badRequest(serviceResponse);
    // ...
  }
}

// Servicio - Contiene toda la lógica de negocio
async asignarProfesor(nombreClase: string, profesorId: string): Promise<ServiceResponse<any>> {
  // Validación
  // Lógica de negocio
  // Manejo de errores
  return { success: true, data: result, statusCode: 200, message: "..." };
}
```

### 2. Manejo de Errores Robusto
- Validación de entrada en servicios
- Códigos de estado HTTP apropiados
- Mensajes de error descriptivos
- Logging centralizado

### 3. Uso de Strapi v5 APIs
- `documentId` en lugar de `id` para referencias
- `entityService` para operaciones CRUD
- Filters y populate actualizados
- TypeScript support

### 4. Lifecycle Hooks
```javascript
// src/api/clase/content-types/clase/lifecycles.js
module.exports = {
  async beforeUpdate(event) {
    // Validación antes de actualizar
  },
  async afterUpdate(event) {
    // Logging después de actualizar
  }
};
```

## Testing

### Casos de Prueba Incluidos en api.rest
- ✅ Búsquedas exitosas
- ✅ Parámetros faltantes
- ✅ Recursos no encontrados
- ✅ Asignaciones duplicadas
- ✅ Casos de error del servidor

### Comandos de Verificación
```bash
# Verificar que no hay errores TypeScript
npm run build

# Iniciar servidor
npm run develop
```

## Conclusión

Las APIs implementadas siguen las mejores prácticas de Strapi v5 y arquitectura limpia:

1. **Controladores delgados**: Solo manejan HTTP
2. **Servicios ricos**: Contienen toda la lógica de negocio
3. **Respuestas estructuradas**: Mapeo consistente de códigos de estado
4. **Validación robusta**: En el nivel de servicio
5. **Manejo de errores**: Completo y descriptivo
6. **TypeScript**: Tipado fuerte para mejor desarrollo

Esto proporciona una base sólida y mantenible para APIs personalizadas en Strapi v5.
