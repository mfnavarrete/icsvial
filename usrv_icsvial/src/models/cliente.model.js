const { DataTypes } = require('sequelize');

/**
 * @param {import('sequelize').Sequelize} sequelize
 */
function defineClienteModel(sequelize) {
  return sequelize.define(
    'Cliente',
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
      },
      imagen: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      nombre: {
        type: DataTypes.STRING(150),
        allowNull: false
      }
    },
    {
      tableName: 'cliente',
      timestamps: false
    }
  );
}

module.exports = {
  defineClienteModel
};
