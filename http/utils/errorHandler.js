const errorHandler = (status, message) => {
  const error = new Error();
  error.satus = status;
  error.message = message;
  return error;
};

module.exports = { errorHandler };
