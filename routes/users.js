const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers, updateData, updateAvatar, getUserData, getUsersById,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/me', getUserData);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30)
  }).min(1),
  headers: Joi.object().keys({
    authorization: Joi.string().regex(/^Bearer [\w\-\.\~\+\/\\]+$/).required(),
    'content-type': Joi.string().regex(/^application\/json$/i).required()
  }).unknown(true),
}) , updateData);

router.patch('/me/avatar', updateAvatar);

router.get('/:id', getUsersById);

module.exports = router;
