const { Joi } = require('celebrate');
const { regExpJwt } = require('./constants');

const schemaHeaderAuth = Joi.object().keys({
  cookie: Joi.string().regex(regExpJwt).required(),
}).unknown(true);

const schemaParamCardId = Joi.object().keys({
  cardId: Joi.string().alphanum().length(24),
});

module.exports = {
  schemaHeaderAuth,
  schemaParamCardId,
};
