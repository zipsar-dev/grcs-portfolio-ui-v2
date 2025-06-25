function createError(statusCode, message) {
  const err = new Error(message);
  err.status = statusCode;
  return err;
}
module.exports = { createError };