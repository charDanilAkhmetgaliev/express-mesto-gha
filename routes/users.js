const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { regExpLink } = require('../scripts/utils/constants');
const { schemaHeaderAuth } = require('../scripts/utils/clbSchemas');
const {
  getUsers, updateData, updateAvatar, getUserData, getUsersById,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/me', getUserData);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }).min(1),
  headers: schemaHeaderAuth,
}), updateData);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(regExpLink).required(),
  }).min(1).max(1),
  headers: schemaHeaderAuth,
}), updateAvatar);

router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().required(),
  }),
}), getUsersById);

module.exports = router;
