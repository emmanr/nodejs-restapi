exports.throwError = (status, msg) => {
  const error = new Error(msg);
  error.statusCode = status;
  throw error;
  // note that if we are inside async await, we should use next(error), but most cases, this will throw an error and try-"catch" will received it so it is okay
};

exports.errorCatcher = (err, next) => {
  if (!err.statusCode) err.statusCode = 500;
  next(err);
};
