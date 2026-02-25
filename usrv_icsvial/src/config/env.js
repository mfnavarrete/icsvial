const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

const ENV_FILE_NAME = '.env';
const ENV_FILE_PATH = path.resolve(process.cwd(), ENV_FILE_NAME);

if (fs.existsSync(ENV_FILE_PATH)) {
  dotenv.config({ path: ENV_FILE_PATH });
}

const DEFAULT_PORT = 3000;
const DEFAULT_DATABASE_URL = 'sqlite:./data/icsvial.sqlite';

/**
 * Entrega la configuración de entorno con fallback a variables de sistema.
 * @returns {{port: number, database: {url: string, ssl: boolean}}}
 */
function getEnv() {
  const dbUrl = typeof process.env.DB_URL === 'string' && process.env.DB_URL.trim().length > 0
    ? process.env.DB_URL
    : process.env.DATABASE_URL;

  return {
    port: Number(process.env.PORT || DEFAULT_PORT),
    database: {
      url: typeof dbUrl === 'string' && dbUrl.trim().length > 0 ? dbUrl : DEFAULT_DATABASE_URL,
      ssl: String(process.env.DB_SSL || 'false').toLowerCase() === 'true'
    }
  };
}

module.exports = {
  getEnv
};
