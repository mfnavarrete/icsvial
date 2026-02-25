const { sequelize } = require('../config/database');
const dbAdminService = require('../modules/db-admin/db-admin.service');
const { LOG_LEVELS, log } = require('../utils/logger');

async function seedDatabase() {
  const summary = await dbAdminService.seedDatabase();

  log({
    level: LOG_LEVELS.INFO,
    message: 'Seed de base de datos ejecutado correctamente.',
    context: {
      module: 'scripts.seed-db',
      action: 'seedDatabase',
      summary
    }
  });
}

seedDatabase()
  .catch((error) => {
    log({
      level: LOG_LEVELS.ERROR,
      message: 'No fue posible ejecutar el seed de la base de datos.',
      context: {
        module: 'scripts.seed-db',
        action: 'seedDatabase',
        errorMessage: error.message,
        code: error.code
      }
    });
    process.exitCode = 1;
  })
  .finally(async () => {
    await sequelize.close();
  });
