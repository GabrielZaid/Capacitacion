import type { Schema, Struct } from '@strapi/strapi';

export interface DetallesAlergeno extends Struct.ComponentSchema {
  collectionName: 'components_detalles_alergenos';
  info: {
    displayName: 'Alergeno';
    icon: 'alien';
  };
  attributes: {
    Descripcion: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 255;
        minLength: 2;
      }>;
    Media: Schema.Attribute.Media<'images' | 'files'> &
      Schema.Attribute.Required;
    Nombre: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'detalles.alergeno': DetallesAlergeno;
    }
  }
}
