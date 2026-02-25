const { DataTypes } = require('sequelize');

/**
 * @param {import('sequelize').Sequelize} sequelize
 */
function defineServicioModel(sequelize) {
  return sequelize.define(
    'Servicio',
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
      },
      nombre: {
        type: DataTypes.STRING(150),
        allowNull: false
      },
      descripcion: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      imagen: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    },
    {
      tableName: 'servicio',
      timestamps: false
    }
  );
}

module.exports = {
  defineServicioModel
};
