/**
 * Error tipado para estandarizar respuestas de error en la API.
 */
class AppError extends Error {
  /**
   * @param {{message: string, code: string, status: number, context?: object}} params
   */
  constructor(params) {
    super(params.message);
    this.name = 'AppError';
    this.code = params.code;
    this.status = params.status;
    this.context = params.context || {};
  }
}

module.exports = {
  AppError
};
