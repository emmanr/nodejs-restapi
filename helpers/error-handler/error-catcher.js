exports.throwError = (status, msg, errorArray) => {
  const error = new Error(msg);
  error.statusCode = status;
  if (errorArray) error.data = errorArray;
  throw error;
  // note that if we are inside async await, we should use next(error), but most cases, this will throw an error and try-"catch" will received it so it is okay
};

exports.errorCatcher = (err, next) => {
  if (!err.statusCode) err.statusCode = 500;
  if (next) {
    next(err);
  } else {
    throw err;
  }
};
