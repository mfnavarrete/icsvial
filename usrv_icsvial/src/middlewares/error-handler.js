const { ERROR_CODES, ERROR_MESSAGES } = require('../constants/errors');
const { LOG_LEVELS, log } = require('../utils/logger');

/**
 * Middleware global de errores.
 */
function errorHandler(error, req, res, next) {
  const status = Number.isInteger(error.status) ? error.status : 500;
  const code = error.code || ERROR_CODES.INTERNAL_SERVER_ERROR;
  const message = error.message || ERROR_MESSAGES.INTERNAL_SERVER_ERROR;
  const context = error.context || {};

  log({
    level: LOG_LEVELS.ERROR,
    message,
    context: {
      code,
      status,
      method: req.method,
      path: req.originalUrl,
      ...context
    }
  });

  res.status(status).json({
    error: {
      code,
      message,
      context
    }
  });

  void next;
}

module.exports = {
  errorHandler
};
