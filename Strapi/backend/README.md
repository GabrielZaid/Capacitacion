# Sistema de Gestión Educativa - Strapi Backend

## Descripción General

Este proyecto es un sistema backend completo desarrollado con Strapi 5.17.0 para la gestión de un entorno educativo. Incluye la administración de clases, profesores, eventos y materiales educativos con una arquitectura modular y escalable.

## 🚀 Funcionalidades Implementadas

### 1. Gestión de Clases (`api::clase`)
- **Modelo Principal**: Sistema completo de gestión de clases académicas
- **Características**:
  - Título único y descripción de la clase
  - Fecha y hora de inicio
  - Relación many-to-many con profesores
  - Soporte para internacionalización (i18n)
  - Componentes anidados para detalles específicos

### 2. Gestión de Profesores (`api::profesor`)
- **Modelo Principal**: Administración completa de profesores
- **Características**:
  - Información personal (nombre, apellido, email, teléfono)
  - Validaciones de datos (email único, teléfono único)
  - Relaciones con clases y eventos
  - Detalles profesionales específicos

### 3. Gestión de Eventos (`api::evento`)
- **Modelo Principal**: Sistema de eventos educativos
- **Características**:
  - Título único y descripción
  - Relación many-to-many con profesores
  - Zona dinámica (Dynamic Zone) para contenido flexible
  - Gestión de materiales y temas
  - Componentes multimedia integrados

## 🧩 Componentes Personalizados

### Componentes de Clase (`clase/`)

#### 1. **Detalles de Clase** (`detalles-clase`)
- Días de la semana (enumeración)
- Horarios (hora_inicio, hora_final)
- Puntos totales del curso
- Información de aulas

#### 2. **Aula** (`aula`)
- Clave única del aula
- Nombre descriptivo del aula
- Validaciones de longitud y unicidad

#### 3. **Tema** (`tema`)
- Nombre y descripción del tema
- Subtemas anidados (componente recursivo)
- Estructura jerárquica de contenido

#### 4. **Subtema** (`subtema`)
- Nombre y descripción del subtema
- Contenido específico de cada tema

### Componentes de Profesor (`profesor/`)

#### 1. **Detalle de Profesor** (`detalle-profesor`)
- Especialidad única
- Experiencia profesional
- Información de domicilio
- País de residencia

### Componentes de Evento (`evento/`)

#### 1. **Detalles de Eventos** (`detalles-eventos`)
- Fecha del evento
- Horarios (inicio y fin)
- Ubicación/lugar del evento

#### 2. **Material** (`material`)
- Tipos de material (Video, Documento, Imagen, Enlace)
- Archivos multimedia múltiples
- Enlaces externos opcionales
- Soporte para todos los tipos de media

### Componentes de Zona Dinámica (`ejercicio5/`)

#### 1. **Rich Text** (`rich-text`)
- Editor de texto enriquecido
- Contenido de bloques estructurados
- Ideal para descripciones detalladas

#### 2. **Media** (`media`)
- Carga múltiple de archivos
- Soporte para imágenes, videos, audios y documentos
- Validaciones por tipo de archivo

#### 3. **Enlace** (`enlace`)
- Título descriptivo del enlace
- URL única validada
- Gestión de referencias externas

## 🗂️ Estructura de Relaciones

### Relaciones Many-to-Many
- **Profesores ↔ Clases**: Un profesor puede impartir múltiples clases, y una clase puede tener múltiples profesores
- **Profesores ↔ Eventos**: Un profesor puede participar en múltiples eventos, y un evento puede tener múltiples profesores

### Componentes Anidados
- **Clases → Detalles de Clase → Aulas**
- **Clases → Temas → Subtemas** (estructura jerárquica)
- **Eventos → Zona Dinámica** (contenido flexible)

## 📦 Dependencias Principales

```json
{
  "@strapi/strapi": "5.17.0",
  "@strapi/plugin-users-permissions": "5.17.0",
  "@strapi/plugin-cloud": "5.17.0",
  "better-sqlite3": "11.3.0",
  "react": "^18.0.0",
  "styled-components": "^6.0.0"
}
```

## 🛠️ Scripts Disponibles

```bash
# Desarrollo
npm run develop

# Construcción
npm run build

# Iniciar producción
npm run start

# Poblar datos de ejemplo
npm run seed:example

# Consola de Strapi
npm run console
```

## 🌐 Características Avanzadas

### 1. Internacionalización (i18n)
- Soporte completo para múltiples idiomas
- Configurado en las entidades principales
- Localización de contenido por región

### 2. Zona Dinámica (Dynamic Zone)
- Contenido flexible y personalizable
- Componentes intercambiables
- Ideal para páginas con estructura variable

### 3. Validaciones Robustas
- Campos únicos donde corresponde
- Validaciones de longitud
- Tipos de datos específicos (email, teléfono, fecha, hora)

### 4. Gestión de Archivos
- Carga múltiple de archivos
- Soporte para múltiples tipos de media
- Organización automática en carpetas

## 🔧 Configuración del Entorno

### Base de Datos
- **SQLite** (desarrollo): `better-sqlite3`
- Migraciones automáticas
- Seed data incluido

### Configuración de Servidor
- Puerto configurable
- Middleware personalizado
- Plugins habilitados

## 📝 Uso del Sistema

### 1. Crear Profesores
1. Acceder al panel de administración
2. Navegar a "Profesores"
3. Completar información personal y profesional
4. Asociar con clases y eventos

### 2. Configurar Clases
1. Crear nueva clase con título único
2. Asignar profesores
3. Configurar detalles (horarios, aulas, puntos)
4. Agregar temas y subtemas

### 3. Gestionar Eventos
1. Crear evento con título descriptivo
2. Asignar profesores responsables
3. Configurar detalles (fecha, lugar, horarios)
4. Agregar materiales y contenido dinámico

## 🚧 Estructura del Proyecto

```
backend/
├── src/
│   ├── api/
│   │   ├── clase/           # Gestión de clases
│   │   ├── profesor/        # Gestión de profesores
│   │   ├── evento/          # Gestión de eventos
│   │   └── ...
│   ├── components/
│   │   ├── clase/           # Componentes de clase
│   │   ├── profesor/        # Componentes de profesor
│   │   ├── evento/          # Componentes de evento
│   │   └── ejercicio5/      # Componentes de zona dinámica
│   └── config/              # Configuraciones
├── data/                    # Datos de ejemplo
├── scripts/                 # Scripts de utilidad
└── public/                  # Archivos públicos
```

## 📊 Características Técnicas

- **Versión de Strapi**: 5.17.0
- **Base de Datos**: SQLite (desarrollo)
- **Soporte TypeScript**: Completo
- **Validaciones**: Integradas en el modelo
- **Autenticación**: Plugin users-permissions
- **Archivos**: Gestión nativa de Strapi

## 🔒 Seguridad

- Validaciones de entrada
- Campos únicos protegidos
- Autenticación y autorización
- Tipos de archivos controlados

---

**Desarrollado con Strapi 5.17.0** | **Última actualización**: Julio 2025