const { ERROR_CODES, ERROR_MESSAGES } = require('../../constants/errors');
const { AppError } = require('../../utils/app-error');
const { validateRequiredFields } = require('../../utils/validation');
const repository = require('./cliente.repository');

const REQUIRED_FIELDS = ['imagen', 'nombre'];

async function listClientes() {
  return repository.findAllClientes();
}

async function getClienteById(id) {
  const cliente = await repository.findClienteById(id);
  if (!cliente) {
    throw new AppError({
      message: ERROR_MESSAGES.NOT_FOUND_CLIENTE,
      code: ERROR_CODES.NOT_FOUND_CLIENTE,
      status: 404,
      context: {
        module: 'cliente.service',
        action: 'getClienteById',
        id
      }
    });
  }

  return cliente;
}

async function createCliente(payload) {
  validateRequiredFields(payload, REQUIRED_FIELDS);
  return repository.createCliente(payload);
}

async function updateCliente(id, payload) {
  validateRequiredFields(payload, REQUIRED_FIELDS);

  const updated = await repository.updateCliente(id, payload);
  if (!updated) {
    throw new AppError({
      message: ERROR_MESSAGES.NOT_FOUND_CLIENTE,
      code: ERROR_CODES.NOT_FOUND_CLIENTE,
      status: 404,
      context: {
        module: 'cliente.service',
        action: 'updateCliente',
        id
      }
    });
  }

  return updated;
}

async function removeCliente(id) {
  const deleted = await repository.deleteCliente(id);
  if (!deleted) {
    throw new AppError({
      message: ERROR_MESSAGES.NOT_FOUND_CLIENTE,
      code: ERROR_CODES.NOT_FOUND_CLIENTE,
      status: 404,
      context: {
        module: 'cliente.service',
        action: 'removeCliente',
        id
      }
    });
  }
}

module.exports = {
  listClientes,
  getClienteById,
  createCliente,
  updateCliente,
  removeCliente
};
