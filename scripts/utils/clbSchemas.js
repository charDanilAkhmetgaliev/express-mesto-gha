const { Joi } = require('celebrate');
const { REG_EXP_LINK, REG_EXP_EMAIL, REG_EXP_PASSWORD } = require('./constants');

const validateSchema = (data) => Joi.object().keys(data);

const schemaParamCardId = validateSchema({
  cardId: Joi.string().hex().length(24).required(),
});

const schemaBodyCards = validateSchema({
  name: Joi.string().min(2).max(30).required(),
  link: Joi.string().regex(REG_EXP_LINK).required(),
});

const schemaBodyUser = validateSchema({
  name: Joi.string().min(2).max(30).required(),
  about: Joi.string().min(2).max(30).required(),
});

const schemaBodyAvatar = validateSchema({
  avatar: Joi.string().regex(REG_EXP_LINK).required(),
});

const schemaParamUserId = validateSchema({
  id: Joi.string().hex().length(24).required(),
});

const schemaBodySignUp = validateSchema({
  name: Joi.string().min(2).max(30),
  about: Joi.string().min(2).max(30),
  avatar: Joi.string().regex(REG_EXP_LINK),
  email: Joi.string().regex(REG_EXP_EMAIL).required(),
  password: Joi.string().regex(REG_EXP_PASSWORD).required(),
});

const schemaBodySignIn = validateSchema({
  email: Joi.string().regex(REG_EXP_EMAIL).required(),
  password: Joi.string().regex(REG_EXP_PASSWORD).required(),
});

module.exports = {
  schemaParamCardId,
  schemaBodyCards,
  schemaBodyUser,
  schemaBodyAvatar,
  schemaParamUserId,
  schemaBodySignUp,
  schemaBodySignIn,
};
