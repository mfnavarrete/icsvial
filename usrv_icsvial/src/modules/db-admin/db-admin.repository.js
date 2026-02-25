const { sequelize, models, runDbOperation } = require('../../config/database');
const {
  DB_TABLES,
  DB_TABLE_CONFIG,
  SERVICE_SEED_DATA,
  BLOG_SEED_DATA,
  CLIENT_SEED_DATA
} = require('./db-admin.constants');

const FOREIGN_KEY_SQL_BY_DIALECT = {
  sqlite: {
    disable: 'PRAGMA foreign_keys = OFF',
    enable: 'PRAGMA foreign_keys = ON'
  },
  mysql: {
    disable: 'SET FOREIGN_KEY_CHECKS = 0',
    enable: 'SET FOREIGN_KEY_CHECKS = 1'
  },
  mariadb: {
    disable: 'SET FOREIGN_KEY_CHECKS = 0',
    enable: 'SET FOREIGN_KEY_CHECKS = 1'
  },
  postgres: {
    disable: "SET session_replication_role = 'replica'",
    enable: "SET session_replication_role = 'origin'"
  }
};

function getAllTableAliases() {
  return Object.values(DB_TABLE_CONFIG).flatMap((tableConfig) => tableConfig.aliases);
}

function resolveTableConfig(tableName) {
  const normalized = String(tableName || '').trim().toLowerCase();
  return Object.entries(DB_TABLE_CONFIG)
    .map(([tableKey, tableConfig]) => ({ tableKey, ...tableConfig }))
    .find((tableConfig) => tableConfig.aliases.includes(normalized)) || null;
}

async function executeWithForeignKeysDisabled(operation) {
  const dialect = sequelize.getDialect();
  const statements = FOREIGN_KEY_SQL_BY_DIALECT[dialect];
  if (!statements) {
    return operation();
  }

  await sequelize.query(statements.disable);
  try {
    return await operation();
  } finally {
    await sequelize.query(statements.enable);
  }
}

async function clearByTableName(tableName) {
  const tableConfig = resolveTableConfig(tableName);
  if (!tableConfig) {
    return null;
  }

  const deletedCount = await runDbOperation(
    () => executeWithForeignKeysDisabled(() => models[tableConfig.modelKey].destroy({ where: {} })),
    { module: 'db-admin.repository', action: 'clearByTableName', tableName: tableConfig.tableKey }
  );

  return {
    table: tableConfig.tableKey,
    deletedCount
  };
}

async function clearDatabase() {
  const tableKeys = [DB_TABLES.BLOGS, DB_TABLES.CLIENTS, DB_TABLES.SERVICES];

  return runDbOperation(
    () => executeWithForeignKeysDisabled(async () => {
      const summary = {};
      for (const tableKey of tableKeys) {
        const modelKey = DB_TABLE_CONFIG[tableKey].modelKey;
        const deletedCount = await models[modelKey].destroy({ where: {} });
        summary[tableKey] = deletedCount;
      }
      return summary;
    }),
    { module: 'db-admin.repository', action: 'clearDatabase' }
  );
}

async function seedServicios() {
  const payload = SERVICE_SEED_DATA.map((serviceSeed) => ({
    id: serviceSeed.id,
    nombre: serviceSeed.title,
    descripcion: serviceSeed.description,
    imagen: serviceSeed.image_path
  }));

  await models.Servicio.destroy({ where: {} });
  const insertedRows = await models.Servicio.bulkCreate(payload);
  return insertedRows.length;
}

async function seedBlogs() {
  const payload = BLOG_SEED_DATA.map((blogSeed) => ({
    id: blogSeed.id,
    imagen: blogSeed.image_path,
    titulo: blogSeed.title,
    autor: blogSeed.author,
    descripcion: blogSeed.description,
    contenido: blogSeed.content
  }));

  await models.Blog.destroy({ where: {} });
  const insertedRows = await models.Blog.bulkCreate(payload);
  return insertedRows.length;
}

async function seedClients() {
  const payload = CLIENT_SEED_DATA.map((clientSeed) => ({
    id: clientSeed.id,
    imagen: clientSeed.image_path,
    nombre: clientSeed.name
  }));

  await models.Cliente.destroy({ where: {} });
  const insertedRows = await models.Cliente.bulkCreate(payload);
  return insertedRows.length;
}

async function seedDatabase() {
  return runDbOperation(
    () => executeWithForeignKeysDisabled(async () => {
      const services = await seedServicios();
      const blogs = await seedBlogs();
      const clients = await seedClients();
      return {
        services,
        blogs,
        clients
      };
    }),
    { module: 'db-admin.repository', action: 'seedDatabase' }
  );
}

module.exports = {
  getAllTableAliases,
  clearByTableName,
  clearDatabase,
  seedServicios,
  seedBlogs,
  seedClients,
  seedDatabase
};
