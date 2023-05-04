const { Joi } = require('celebrate');
const { regExpAuth } = require('./constants');

const schemaHeaderAuth = Joi.object().keys({
  authorization: Joi.string().regex(regExpAuth).required(),
}).unknown(true);

const schemaParamCardId = Joi.object().keys({
  cardId: Joi.string().alphanum().length(24),
});

module.exports = {
  schemaHeaderAuth,
  schemaParamCardId,
};
