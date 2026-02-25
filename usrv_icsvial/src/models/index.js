const { defineServicioModel } = require('./servicio.model');
const { defineClienteModel } = require('./cliente.model');
const { defineBlogModel } = require('./blog.model');

/**
 * @param {import('sequelize').Sequelize} sequelize
 */
function initModels(sequelize) {
  const Servicio = defineServicioModel(sequelize);
  const Cliente = defineClienteModel(sequelize);
  const Blog = defineBlogModel(sequelize);

  return {
    Servicio,
    Cliente,
    Blog
  };
}

module.exports = {
  initModels
};
