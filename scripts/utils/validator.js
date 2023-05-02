const validator = require('validator');
const ValidationError = require('../components/errors/ValidationError');

module.exports.handlerValidation = (req) => {
  const { email, password } = req.body;
  // todo: добавить validator.strongPassword(password)
  if (!email || !password || !validator.isEmail(email)) {
    throw new ValidationError();
  }
};
