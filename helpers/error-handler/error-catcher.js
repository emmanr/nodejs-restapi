exports.throwError = (status, msg) => {
  const error = new Error(msg);
  error.statusCode = 422;
  throw error;
};

exports.errorCatcher = (err, next) => {
  if (!err.statusCode) err.statusCode = 500;
  next(err);
};
