const DB_TABLES = {
  SERVICES: 'services',
  CLIENTS: 'clients',
  BLOGS: 'blogs'
};

const DB_TABLE_CONFIG = {
  [DB_TABLES.SERVICES]: {
    modelKey: 'Servicio',
    aliases: ['services', 'service', 'servicios', 'servicio']
  },
  [DB_TABLES.CLIENTS]: {
    modelKey: 'Cliente',
    aliases: ['clients', 'client', 'clientes', 'cliente']
  },
  [DB_TABLES.BLOGS]: {
    modelKey: 'Blog',
    aliases: ['blogs', 'blog']
  }
};

const SERVICE_SEED_DATA = [
  {
    id: 1,
    title: 'Señalización Vertical',
    description: 'Instalación de señales reglamentarias y preventivas.',
    image_path: '/servicios/senalizacion-vertical.png'
  },
  {
    id: 2,
    title: 'Señalización Horizontal',
    description: 'Marcas viales sobre calzada.',
    image_path: '/servicios/senalizacion-horizontal.png'
  },
  {
    id: 3,
    title: 'Preformado de pintura termoplástica',
    description: 'Materiales de alto desempeño.',
    image_path: '/servicios/pintura-termoplastica.png'
  },
  {
    id: 4,
    title: 'Diseños Personalizados',
    description: 'Soluciones a medida.',
    image_path: '/servicios/disenos-personalizados.png'
  },
  {
    id: 5,
    title: 'Ciclovías',
    description: 'Movilidad sostenible y segura.',
    image_path: '/servicios/ciclovias-seguridad.png'
  },
  {
    id: 6,
    title: 'Señalización Sector Industrial',
    description: 'Seguridad en plantas y bodegas.',
    image_path: '/servicios/industrial-safety.png'
  },
  {
    id: 7,
    title: 'Limpieza Huellas de Caucho (Aeropuertos)',
    description: 'Remoción técnica en pistas.',
    image_path: '/servicios/limpieza-pistas-aeropuerto.png'
  },
  {
    id: 8,
    title: 'Borrado Señalización Horizontal (Wetblasting)',
    description: 'Remoción con agua y abrasivo.',
    image_path: '/servicios/borrado-wetblasting.png'
  },
  {
    id: 9,
    title: 'Pórticos',
    description: 'Estructuras para señales de alto flujo.',
    image_path: '/servicios/porticos-viales.png'
  },
  {
    id: 10,
    title: 'Guardavías',
    description: 'Barreras de seguridad metálicas.',
    image_path: '/servicios/guardavias-seguridad.png'
  }
];

const BLOG_SEED_DATA = [
  {
    id: 1,
    title: 'La importancia de la Señalización Vertical en la Prevención de Accidentes',
    author: 'Equipo ICSVial',
    description: 'Cómo la correcta implementación de señales verticales reduce riesgos y ordena el flujo vehicular.',
    content: 'La señalización vertical es uno de los pilares de la seguridad vial. Su función principal es advertir, reglamentar e informar al conductor con suficiente anticipación para reducir maniobras bruscas y conflictos de tránsito.\n\nCuando las señales están correctamente ubicadas, con retroreflectividad adecuada y mantenimiento periódico, se incrementa la percepción del riesgo y mejora la toma de decisiones al volante. Esto impacta de forma directa en la disminución de siniestros, especialmente en intersecciones, curvas y zonas escolares.\n\nPara una estrategia efectiva, se recomienda integrar auditorías técnicas, reposición oportuna y compatibilidad con la normativa vigente, garantizando legibilidad diurna y nocturna.',
    image_path: '/blog/blog1.png'
  },
  {
    id: 2,
    title: 'Guía Completa sobre Señales de Tránsito: Normativa y Visibilidad Nocturna',
    author: 'Equipo ICSVial',
    description: 'Resumen práctico de clasificación, normativa aplicable y criterios de visibilidad para operación segura de vías.',
    content: 'Las señales de tránsito se clasifican en reglamentarias, preventivas e informativas, y cada grupo responde a objetivos distintos dentro de la operación vial. El cumplimiento normativo no solo exige su presencia, sino también dimensiones, colores, ubicación y materiales conforme al tipo de vía.\n\nUno de los factores más críticos es la visibilidad nocturna. La falta de contraste, suciedad o desgaste reduce drásticamente el tiempo de reacción del conductor. Por ello, la selección de láminas retroreflectivas, el control de obstrucciones visuales y la evaluación periódica en campo son prácticas obligatorias para una infraestructura confiable.\n\nUna red vial bien señalizada se traduce en mayor seguridad, mejor orientación y menor accidentalidad, tanto en entornos urbanos como en corredores interurbanos.',
    image_path: '/blog/blog2.png'
  }
];

const CLIENT_SEED_DATA = [
  { id: 1, name: 'Alcaldía de Machala', image_path: '/clientes/alcaldia-machala.png' },
  { id: 2, name: 'Alcaldía Cuenca', image_path: '/clientes/alcaldia-cuenca.png' },
  { id: 3, name: 'Alcaldía de Pasaje', image_path: '/clientes/alcaldia-pasaje.png' },
  { id: 4, name: 'EPMMOP (Movilidad y Obras)', image_path: '/clientes/epmmop-movilidad-obras.png' },
  { id: 5, name: 'Latacunga GAD', image_path: '/clientes/latacunga-gad.png' },
  { id: 6, name: 'Las Naves GAD', image_path: '/clientes/las-naves-gad.png' },
  { id: 7, name: 'EP Petroecuador', image_path: '/clientes/ep-petroecuador.png' },
  { id: 8, name: 'Quito Alcaldía Metropolitana', image_path: '/clientes/quito-alcaldia-metropolitana.png' },
  { id: 9, name: 'Prefectura de Sucumbíos', image_path: '/clientes/prefectura-sucumbios.png' },
  { id: 10, name: 'Cervecería Nacional', image_path: '/clientes/cerveceria-nacional.png' },
  { id: 11, name: 'Consermin', image_path: '/clientes/consermin.png' },
  { id: 12, name: 'Hidalgo e Hidalgo (H&H)', image_path: '/clientes/hidalgo-hidalgo-hh.png' },
  { id: 13, name: 'Siegfried', image_path: '/clientes/siegfried.png' },
  { id: 14, name: 'ST Innovamos para Salvar Vidas', image_path: '/clientes/st-innovamos-salvar-vidas.png' },
  { id: 15, name: 'UDLA', image_path: '/clientes/udla.png' }
];

module.exports = {
  DB_TABLES,
  DB_TABLE_CONFIG,
  SERVICE_SEED_DATA,
  BLOG_SEED_DATA,
  CLIENT_SEED_DATA
};
