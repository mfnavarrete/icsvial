const ERROR_MESSAGES = {
  INTERNAL_SERVER_ERROR: 'Error interno del servidor.',
  INVALID_ID: 'El identificador debe ser un número entero positivo.',
  VALIDATION_ERROR: 'Los datos enviados no cumplen con los requisitos.',
  NOT_FOUND_SERVICIO: 'No se encontró el servicio solicitado.',
  NOT_FOUND_CLIENTE: 'No se encontró el cliente solicitado.',
  NOT_FOUND_BLOG: 'No se encontró la publicación de blog solicitada.',
  INVALID_TABLE_NAME: 'El nombre de tabla indicado no es válido para operaciones administrativas.',
  DATABASE_CONNECTION_ERROR: 'No fue posible conectar con la base de datos.',
  DATABASE_QUERY_ERROR: 'La operación en base de datos no pudo completarse.',
  DATABASE_DIALECT_NOT_SUPPORTED: 'El dialecto SQL indicado en DATABASE_URL no es soportado.'
};

const ERROR_CODES = {
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  INVALID_ID: 'INVALID_ID',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  NOT_FOUND_SERVICIO: 'NOT_FOUND_SERVICIO',
  NOT_FOUND_CLIENTE: 'NOT_FOUND_CLIENTE',
  NOT_FOUND_BLOG: 'NOT_FOUND_BLOG',
  INVALID_TABLE_NAME: 'INVALID_TABLE_NAME',
  DATABASE_CONNECTION_ERROR: 'DATABASE_CONNECTION_ERROR',
  DATABASE_QUERY_ERROR: 'DATABASE_QUERY_ERROR',
  DATABASE_DIALECT_NOT_SUPPORTED: 'DATABASE_DIALECT_NOT_SUPPORTED'
};

module.exports = {
  ERROR_MESSAGES,
  ERROR_CODES
};
