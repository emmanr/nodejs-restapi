const { validationResult } = require('express-validator');

const validationError = (req, msg) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    const error = new Error(msg);
    error.statusCode = 422;
    throw error;
  }
}

module.exports = validationError;
