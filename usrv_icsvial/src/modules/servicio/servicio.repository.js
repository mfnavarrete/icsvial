const { models, runDbOperation } = require('../../config/database');

async function findAllServicios() {
  return runDbOperation(
    () => models.Servicio.findAll({ order: [['id', 'DESC']] }),
    { module: 'servicio.repository', action: 'findAllServicios' }
  );
}

async function findServicioById(id) {
  return runDbOperation(
    () => models.Servicio.findByPk(id),
    { module: 'servicio.repository', action: 'findServicioById', id }
  );
}

async function createServicio(data) {
  return runDbOperation(
    () => models.Servicio.create({ nombre: data.nombre, descripcion: data.descripcion, imagen: data.imagen }),
    { module: 'servicio.repository', action: 'createServicio' }
  );
}

async function updateServicio(id, data) {
  return runDbOperation(async () => {
    const existing = await models.Servicio.findByPk(id);
    if (!existing) {
      return null;
    }

    await existing.update({
      nombre: data.nombre,
      descripcion: data.descripcion,
      imagen: data.imagen
    });
    return existing;
  }, { module: 'servicio.repository', action: 'updateServicio', id });
}

async function deleteServicio(id) {
  return runDbOperation(async () => {
    const deletedCount = await models.Servicio.destroy({ where: { id } });
    return deletedCount > 0 ? { id } : null;
  }, { module: 'servicio.repository', action: 'deleteServicio', id });
}

module.exports = {
  findAllServicios,
  findServicioById,
  createServicio,
  updateServicio,
  deleteServicio
};
