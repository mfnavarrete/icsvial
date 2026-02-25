const LOG_LEVELS = {
  DEBUG: 'DEBUG',
  INFO: 'INFO',
  ERROR: 'ERROR'
};

/**
 * Registra mensajes de forma estructurada (JSON) en stdout/stderr.
 * @param {{level: string, message: string, context?: object}} entry
 */
function log(entry) {
  const payload = {
    timestamp: new Date().toISOString(),
    level: entry.level,
    message: entry.message,
    context: entry.context || {}
  };

  const serialized = `${JSON.stringify(payload)}\n`;

  if (entry.level === LOG_LEVELS.ERROR) {
    process.stderr.write(serialized);
    return;
  }

  process.stdout.write(serialized);
}

module.exports = {
  LOG_LEVELS,
  log
};
