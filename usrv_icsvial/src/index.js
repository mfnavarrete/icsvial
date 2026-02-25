const express = require('express');
const path = require('path');

const { getEnv } = require('./config/env');
const { testConnection } = require('./config/database');
const routes = require('./routes');
const { errorHandler } = require('./middlewares/error-handler');
const { LOG_LEVELS, log } = require('./utils/logger');

const app = express();
const env = getEnv();
const PUBLIC_DIRECTORY_PATH = path.resolve(process.cwd(), 'public');

app.use(express.json());
app.use('/public', express.static(PUBLIC_DIRECTORY_PATH));
app.use('/api', routes);
app.use(errorHandler);

async function startServer() {
  await testConnection();

  app.listen(env.port, () => {
    log({
      level: LOG_LEVELS.INFO,
      message: 'Servidor iniciado correctamente.',
      context: {
        module: 'index',
        action: 'startServer',
        port: env.port
      }
    });
  });
}

startServer().catch((error) => {
  log({
    level: LOG_LEVELS.ERROR,
    message: 'No fue posible iniciar el servidor.',
    context: {
      module: 'index',
      action: 'startServer',
      errorMessage: error.message,
      code: error.code
    }
  });
  process.exitCode = 1;
});
