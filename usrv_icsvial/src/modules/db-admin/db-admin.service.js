const { ERROR_CODES, ERROR_MESSAGES } = require('../../constants/errors');
const { AppError } = require('../../utils/app-error');
const repository = require('./db-admin.repository');

async function clearDatabase() {
  return repository.clearDatabase();
}

async function clearTable(tableName) {
  const result = await repository.clearByTableName(tableName);
  if (!result) {
    throw new AppError({
      message: ERROR_MESSAGES.INVALID_TABLE_NAME,
      code: ERROR_CODES.INVALID_TABLE_NAME,
      status: 400,
      context: {
        module: 'db-admin.service',
        action: 'clearTable',
        tableName,
        allowedTables: repository.getAllTableAliases()
      }
    });
  }

  return result;
}

async function seedDatabase() {
  return repository.seedDatabase();
}

module.exports = {
  clearDatabase,
  clearTable,
  seedDatabase
};
