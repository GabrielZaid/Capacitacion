export const MENU_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DRAFT: 'draft'
} as const;

export const ERROR_MESSAGES = {
  MENU_NOT_FOUND: 'Menu not found',
  INVALID_MENU_DATA: 'Invalid menu data provided',
  UNAUTHORIZED_ACCESS: 'Unauthorized access to menu',
  DUPLICATE_PLATES: 'Cannot use the same plate in multiple categories (First, Second, Dessert)',
  PLATE_NOT_FOUND: 'Plate not found',
  INVALID_PRICE_RANGE: 'Invalid price range provided',
  INVALID_ALLERGEN_FILTER: 'Invalid allergen filter provided'
} as const;

export const SUCCESS_MESSAGES = {
  MENU_CREATED: 'Menu created successfully',
  MENU_UPDATED: 'Menu updated successfully',
  MENU_DELETED: 'Menu deleted successfully',
  DESSERTS_RETRIEVED: 'Desserts retrieved successfully',
  MENUS_FILTERED: 'Menus filtered successfully',
  POPULAR_PLATES_RETRIEVED: 'Popular plates retrieved successfully'
} as const;

export const API_ROUTES = {
  MENU_SERVICE: 'api::menu-diario.menu-service',
  MENU_DIARIO: 'api::menu-diario.menu-diario',
  PLATO: 'api::plato.plato',
  TIPO_MENU: 'api::tipo-menu.tipo-menu'
} as const;

export const FIELD_NAMES = {
  FIRST: 'Primero',
  SECOND: 'Segundo',
  DESSERT: 'Postre',
  PRICE: 'Precio',
  TOTAL_PRICE: 'Sum_Precio',
  TAX: 'IVA',
  DAY: 'dia',
  MENU_TYPES: 'tipo_menus',
  ALLERGEN: 'Alergeno',
  ALLERGEN_NAME: 'nombre'
} as const;

export const TAX_RATE = {
  DEFAULT: 0.16,
  STANDARD: 0.10
} as const;

export const QUERY_PARAMS = {
  MIN_PRICE: 'min_precio',
  MAX_PRICE: 'max_precio',
  EXCLUDE_ALLERGENS: 'excluir_alergenos',
  MIN_APPEARANCES: 'min_apariciones'
} as const;

export const PLATE_CATEGORIES = {
  FIRST: 'first',
  SECOND: 'second',
  DESSERT: 'dessert'
} as const;
