/**
 * Envuelve handlers async para delegar errores al middleware global.
 * @param {import('express').RequestHandler} handler
 * @returns {import('express').RequestHandler}
 */
function asyncHandler(handler) {
  return function asyncWrapper(req, res, next) {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
}

module.exports = {
  asyncHandler
};
