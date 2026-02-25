const { ERROR_CODES, ERROR_MESSAGES } = require('../constants/errors');
const { AppError } = require('./app-error');

/**
 * Convierte y valida un id como entero positivo.
 * @param {string} rawId
 * @returns {number}
 */
function parsePositiveId(rawId) {
  const parsedId = Number(rawId);
  if (!Number.isInteger(parsedId) || parsedId <= 0) {
    throw new AppError({
      message: ERROR_MESSAGES.INVALID_ID,
      code: ERROR_CODES.INVALID_ID,
      status: 400,
      context: {
        operation: 'parsePositiveId',
        rawId
      }
    });
  }

  return parsedId;
}

/**
 * Valida que los campos requeridos no estén vacíos.
 * @param {Record<string, unknown>} payload
 * @param {string[]} requiredFields
 */
function validateRequiredFields(payload, requiredFields) {
  const missingFields = requiredFields.filter((field) => {
    const value = payload[field];
    return typeof value !== 'string' || value.trim().length === 0;
  });

  if (missingFields.length > 0) {
    throw new AppError({
      message: ERROR_MESSAGES.VALIDATION_ERROR,
      code: ERROR_CODES.VALIDATION_ERROR,
      status: 400,
      context: {
        operation: 'validateRequiredFields',
        missingFields
      }
    });
  }
}

module.exports = {
  parsePositiveId,
  validateRequiredFields
};
