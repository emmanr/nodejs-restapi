const { validationResult } = require('express-validator');
const { throwError } = require('./error-catcher');

const validationError = (req, msg) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    throwError(422, msg);
  }
}

module.exports = validationError;
