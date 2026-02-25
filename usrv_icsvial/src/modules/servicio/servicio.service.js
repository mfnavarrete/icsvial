const { ERROR_CODES, ERROR_MESSAGES } = require('../../constants/errors');
const { AppError } = require('../../utils/app-error');
const { validateRequiredFields } = require('../../utils/validation');
const repository = require('./servicio.repository');

const REQUIRED_FIELDS = ['nombre', 'descripcion', 'imagen'];

async function listServicios() {
  return repository.findAllServicios();
}

async function getServicioById(id) {
  const servicio = await repository.findServicioById(id);
  if (!servicio) {
    throw new AppError({
      message: ERROR_MESSAGES.NOT_FOUND_SERVICIO,
      code: ERROR_CODES.NOT_FOUND_SERVICIO,
      status: 404,
      context: {
        module: 'servicio.service',
        action: 'getServicioById',
        id
      }
    });
  }

  return servicio;
}

async function createServicio(payload) {
  validateRequiredFields(payload, REQUIRED_FIELDS);
  return repository.createServicio(payload);
}

async function updateServicio(id, payload) {
  validateRequiredFields(payload, REQUIRED_FIELDS);

  const updated = await repository.updateServicio(id, payload);
  if (!updated) {
    throw new AppError({
      message: ERROR_MESSAGES.NOT_FOUND_SERVICIO,
      code: ERROR_CODES.NOT_FOUND_SERVICIO,
      status: 404,
      context: {
        module: 'servicio.service',
        action: 'updateServicio',
        id
      }
    });
  }

  return updated;
}

async function removeServicio(id) {
  const deleted = await repository.deleteServicio(id);
  if (!deleted) {
    throw new AppError({
      message: ERROR_MESSAGES.NOT_FOUND_SERVICIO,
      code: ERROR_CODES.NOT_FOUND_SERVICIO,
      status: 404,
      context: {
        module: 'servicio.service',
        action: 'removeServicio',
        id
      }
    });
  }
}

module.exports = {
  listServicios,
  getServicioById,
  createServicio,
  updateServicio,
  removeServicio
};
