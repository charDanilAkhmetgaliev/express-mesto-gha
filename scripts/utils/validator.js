const validator = require('validator');
const ValidationError = require('../components/errors/ValidationError');
const { handlerSendError } = require('./errors');

module.exports.validationHandler = (req, res) => {
  const { email, password } = req.body;

  if (email && password && validator.isEmail(`${email}`) && validator.isStrongPassword(`${password}`)) {
  } else {
    handlerSendError(res, new ValidationError());
  }
};
