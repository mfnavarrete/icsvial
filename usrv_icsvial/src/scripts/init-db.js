const { sequelize } = require('../config/database');
const { LOG_LEVELS, log } = require('../utils/logger');

async function initDatabase() {
  await sequelize.sync();

  log({
    level: LOG_LEVELS.INFO,
    message: 'Esquema de base de datos sincronizado correctamente.',
    context: {
      module: 'scripts.init-db',
      action: 'initDatabase'
    }
  });
}

initDatabase()
  .catch((error) => {
    log({
      level: LOG_LEVELS.ERROR,
      message: 'No fue posible inicializar la base de datos.',
      context: {
        module: 'scripts.init-db',
        action: 'initDatabase',
        errorMessage: error.message,
        code: error.code
      }
    });
    process.exitCode = 1;
  })
  .finally(async () => {
    await sequelize.close();
  });
