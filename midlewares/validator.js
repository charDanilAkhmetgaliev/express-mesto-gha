const validator = require('validator');
const ValidationError = require('../scripts/utils/ValidationError');
const { handlerSendError } = require('../scripts/utils/errors');

module.exports = (req, res, next) => {
  const { email, password } = req.body;

  if (validator.isEmail(`${email}`) && validator.isStrongPassword(`${password}`)) {
    next();
  } else {
    handlerSendError(res, new ValidationError());
  }
};
