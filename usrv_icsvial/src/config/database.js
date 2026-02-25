const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

const { getEnv } = require('./env');
const { ERROR_CODES, ERROR_MESSAGES } = require('../constants/errors');
const { AppError } = require('../utils/app-error');
const { initModels } = require('../models');

const env = getEnv();

const DIALECT_BY_PROTOCOL = {
  postgres: 'postgres',
  postgresql: 'postgres',
  mysql: 'mysql',
  mariadb: 'mariadb',
  sqlite: 'sqlite'
};

/**
 * Obtiene el dialecto Sequelize en base al protocolo de DATABASE_URL.
 * @returns {'postgres'|'mysql'|'mariadb'|'sqlite'}
 */
function resolveDialect() {
  const protocol = new URL(env.database.url).protocol.replace(':', '');
  const dialect = DIALECT_BY_PROTOCOL[protocol];
  if (!dialect) {
    throw new AppError({
      message: ERROR_MESSAGES.DATABASE_DIALECT_NOT_SUPPORTED,
      code: ERROR_CODES.DATABASE_DIALECT_NOT_SUPPORTED,
      status: 500,
      context: {
        operation: 'database.resolveDialect',
        protocol
      }
    });
  }

  return dialect;
}

/**
 * Obtiene el path de storage para SQLite a partir de DATABASE_URL.
 * @returns {string}
 */
function resolveSqliteStorage() {
  const sqlitePrefix = 'sqlite:';
  const normalizedUrl = env.database.url;
  const rawStorage = normalizedUrl.startsWith(sqlitePrefix)
    ? normalizedUrl.slice(sqlitePrefix.length)
    : './data/icsvial.sqlite';
  const sanitizedStorage = rawStorage.startsWith('//') ? rawStorage.slice(2) : rawStorage;
  return path.resolve(process.cwd(), sanitizedStorage);
}

/**
 * Construye la configuración de Sequelize para el dialecto detectado.
 * @param {'postgres'|'mysql'|'mariadb'|'sqlite'} dialect
 * @returns {{dialect: 'postgres'|'mysql'|'mariadb'|'sqlite', url?: string, storage?: string, dialectOptions?: object}}
 */
function buildSequelizeConfig(dialect) {
  if (dialect === 'sqlite') {
    const storage = resolveSqliteStorage();
    const storageDirectory = path.dirname(storage);
    fs.mkdirSync(storageDirectory, { recursive: true });

    return {
      dialect,
      storage
    };
  }

  return {
    dialect,
    url: env.database.url,
    dialectOptions: env.database.ssl ? { ssl: { require: true, rejectUnauthorized: false } } : {}
  };
}

const dialect = resolveDialect();
const sequelizeConfig = buildSequelizeConfig(dialect);

const sequelize = dialect === 'sqlite'
  ? new Sequelize({
    dialect: sequelizeConfig.dialect,
    storage: sequelizeConfig.storage,
    logging: false
  })
  : new Sequelize(sequelizeConfig.url, {
    dialect: sequelizeConfig.dialect,
    logging: false,
    dialectOptions: sequelizeConfig.dialectOptions
  });

const models = initModels(sequelize);

/**
 * Ejecuta una operación ORM con manejo estandarizado de errores.
 * @param {() => Promise<any>} operation
 * @param {object} context
 * @returns {Promise<any>}
 */
async function runDbOperation(operation, context = {}) {
  try {
    return await operation();
  } catch (error) {
    throw new AppError({
      message: ERROR_MESSAGES.DATABASE_QUERY_ERROR,
      code: ERROR_CODES.DATABASE_QUERY_ERROR,
      status: 500,
      context: {
        ...context,
        operation: 'database.runDbOperation',
        errorMessage: error.message
      }
    });
  }
}

/**
 * Verifica conectividad con la base de datos.
 * @returns {Promise<void>}
 */
async function testConnection() {
  try {
    await sequelize.authenticate();
  } catch (error) {
    throw new AppError({
      message: ERROR_MESSAGES.DATABASE_CONNECTION_ERROR,
      code: ERROR_CODES.DATABASE_CONNECTION_ERROR,
      status: 500,
      context: {
        operation: 'database.testConnection',
        originalErrorCode: error.code,
        originalErrorMessage: error.message
      }
    });
  }
}

module.exports = {
  runDbOperation,
  testConnection,
  sequelize,
  models
};
