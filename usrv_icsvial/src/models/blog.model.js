const { DataTypes } = require('sequelize');

/**
 * @param {import('sequelize').Sequelize} sequelize
 */
function defineBlogModel(sequelize) {
  return sequelize.define(
    'Blog',
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
      titulo: {
        type: DataTypes.STRING(200),
        allowNull: false
      },
      autor: {
        type: DataTypes.STRING(150),
        allowNull: false
      },
      descripcion: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      contenido: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    },
    {
      tableName: 'blog',
      timestamps: false
    }
  );
}

module.exports = {
  defineBlogModel
};
