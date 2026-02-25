const { models, runDbOperation } = require('../../config/database');

async function findAllClientes() {
  return runDbOperation(
    () => models.Cliente.findAll({ order: [['id', 'DESC']] }),
    { module: 'cliente.repository', action: 'findAllClientes' }
  );
}

async function findClienteById(id) {
  return runDbOperation(
    () => models.Cliente.findByPk(id),
    { module: 'cliente.repository', action: 'findClienteById', id }
  );
}

async function createCliente(data) {
  return runDbOperation(
    () => models.Cliente.create({ imagen: data.imagen, nombre: data.nombre }),
    { module: 'cliente.repository', action: 'createCliente' }
  );
}

async function updateCliente(id, data) {
  return runDbOperation(async () => {
    const existing = await models.Cliente.findByPk(id);
    if (!existing) {
      return null;
    }

    await existing.update({
      imagen: data.imagen,
      nombre: data.nombre
    });
    return existing;
  }, { module: 'cliente.repository', action: 'updateCliente', id });
}

async function deleteCliente(id) {
  return runDbOperation(async () => {
    const deletedCount = await models.Cliente.destroy({ where: { id } });
    return deletedCount > 0 ? { id } : null;
  }, { module: 'cliente.repository', action: 'deleteCliente', id });
}

module.exports = {
  findAllClientes,
  findClienteById,
  createCliente,
  updateCliente,
  deleteCliente
};
