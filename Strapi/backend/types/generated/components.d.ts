import type { Schema, Struct } from '@strapi/strapi';

export interface ClaseAula extends Struct.ComponentSchema {
  collectionName: 'components_clase_aulas';
  info: {
    displayName: 'aula';
  };
  attributes: {
    clave_aula: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 255;
        minLength: 2;
      }> &
      Schema.Attribute.DefaultTo<'N/R'>;
    nombre_aula: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 255;
        minLength: 2;
      }> &
      Schema.Attribute.DefaultTo<'N/R'>;
  };
}

export interface ClaseDetallesClase extends Struct.ComponentSchema {
  collectionName: 'components_clase_detalles_clases';
  info: {
    displayName: 'detalles_clase';
  };
  attributes: {
    aula: Schema.Attribute.Component<'clase.aula', true>;
    dias: Schema.Attribute.Enumeration<
      [
        'Domingo',
        'Lunes',
        'Martes',
        'Mi\u00E9rcoles',
        'Jueves',
        'Viernes',
        'S\u00E1bado',
      ]
    > &
      Schema.Attribute.Required;
    hora_final: Schema.Attribute.Time & Schema.Attribute.Required;
    hora_inicio: Schema.Attribute.Time & Schema.Attribute.Required;
    puntos_totales: Schema.Attribute.BigInteger &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'999999999999999'>;
  };
}

export interface ClaseSubtema extends Struct.ComponentSchema {
  collectionName: 'components_clase_subtemas';
  info: {
    displayName: 'subtema';
  };
  attributes: {
    descripcion: Schema.Attribute.Text & Schema.Attribute.DefaultTo<'N/R'>;
    nombre_subtema: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 255;
        minLength: 2;
      }> &
      Schema.Attribute.DefaultTo<'N/R'>;
  };
}

export interface ClaseTema extends Struct.ComponentSchema {
  collectionName: 'components_clase_temas';
  info: {
    displayName: 'tema';
  };
  attributes: {
    descripcion: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 255;
        minLength: 2;
      }> &
      Schema.Attribute.DefaultTo<'N/R'>;
    nombre_tema: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 255;
        minLength: 2;
      }> &
      Schema.Attribute.DefaultTo<'N/R'>;
    subtema: Schema.Attribute.Component<'clase.subtema', true>;
  };
}

export interface Ejercicio5Enlace extends Struct.ComponentSchema {
  collectionName: 'components_ejercicio5_enlaces';
  info: {
    displayName: 'Enlace';
    icon: 'link';
  };
  attributes: {
    enlace: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    titulo: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 255;
        minLength: 1;
      }>;
  };
}

export interface Ejercicio5Media extends Struct.ComponentSchema {
  collectionName: 'components_ejercicio5_media';
  info: {
    displayName: 'Media';
    icon: 'attachment';
  };
  attributes: {
    Media: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    > &
      Schema.Attribute.Required;
  };
}

export interface Ejercicio5RichText extends Struct.ComponentSchema {
  collectionName: 'components_ejercicio5_rich_texts';
  info: {
    displayName: 'Rich text';
  };
  attributes: {
    descripcion: Schema.Attribute.Blocks & Schema.Attribute.Required;
  };
}

export interface EventoDetallesEventos extends Struct.ComponentSchema {
  collectionName: 'components_evento_detalles_eventos';
  info: {
    displayName: 'detalles_eventos';
  };
  attributes: {
    fecha: Schema.Attribute.Date & Schema.Attribute.Required;
    hora_final: Schema.Attribute.Time & Schema.Attribute.Required;
    hora_inicio: Schema.Attribute.Time & Schema.Attribute.Required;
    lugar: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 255;
        minLength: 2;
      }> &
      Schema.Attribute.DefaultTo<'N/R'>;
  };
}

export interface EventoMaterial extends Struct.ComponentSchema {
  collectionName: 'components_evento_materials';
  info: {
    displayName: 'material';
  };
  attributes: {
    archivos: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    > &
      Schema.Attribute.Required;
    enlace: Schema.Attribute.String;
    tipo: Schema.Attribute.Enumeration<
      ['Video', 'Documento', 'Imagen', 'Enlace']
    > &
      Schema.Attribute.Required;
  };
}

export interface EventoProfesorEvento extends Struct.ComponentSchema {
  collectionName: 'components_evento_profesor_eventos';
  info: {
    displayName: 'profesor_evento';
  };
  attributes: {
    rol: Schema.Attribute.Enumeration<
      [
        'organizador',
        'administrador',
        'auditor',
        'visitante',
        'participante',
        'staff',
        'presentador',
      ]
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'participante'>;
  };
}

export interface ProfesorDetalleProfesor extends Struct.ComponentSchema {
  collectionName: 'components_profesor_detalle_profesors';
  info: {
    displayName: 'detalle_profesor';
  };
  attributes: {
    domicilio: Schema.Attribute.String;
    especialidad: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 255;
        minLength: 2;
      }> &
      Schema.Attribute.DefaultTo<'N/R'>;
    experiencia: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 255;
        minLength: 2;
      }> &
      Schema.Attribute.DefaultTo<'N/R'>;
    pais_recidencia: Schema.Attribute.String;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'clase.aula': ClaseAula;
      'clase.detalles-clase': ClaseDetallesClase;
      'clase.subtema': ClaseSubtema;
      'clase.tema': ClaseTema;
      'ejercicio5.enlace': Ejercicio5Enlace;
      'ejercicio5.media': Ejercicio5Media;
      'ejercicio5.rich-text': Ejercicio5RichText;
      'evento.detalles-eventos': EventoDetallesEventos;
      'evento.material': EventoMaterial;
      'evento.profesor-evento': EventoProfesorEvento;
      'profesor.detalle-profesor': ProfesorDetalleProfesor;
      'shared.media': SharedMedia;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
    }
  }
}
