const { sequelize } = require('../config/database');
const dbAdminService = require('../modules/db-admin/db-admin.service');
const { LOG_LEVELS, log } = require('../utils/logger');

async function clearDatabase() {
  const summary = await dbAdminService.clearDatabase();

  log({
    level: LOG_LEVELS.INFO,
    message: 'Limpieza total de base de datos ejecutada correctamente.',
    context: {
      module: 'scripts.clear-db',
      action: 'clearDatabase',
      summary
    }
  });
}

clearDatabase()
  .catch((error) => {
    log({
      level: LOG_LEVELS.ERROR,
      message: 'No fue posible ejecutar la limpieza total de la base de datos.',
      context: {
        module: 'scripts.clear-db',
        action: 'clearDatabase',
        errorMessage: error.message,
        code: error.code
      }
    });
    process.exitCode = 1;
  })
  .finally(async () => {
    await sequelize.close();
  });
