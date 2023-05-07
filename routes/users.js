const router = require('express').Router();
const { celebrate } = require('celebrate');
const { schemaBodyUser, schemaBodyAvatar, schemaParamUserId } = require('../scripts/utils/clbSchemas');
const {
  getUsers, updateData, updateAvatar, getUserData, getUsersById,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/me', getUserData);

router.patch('/me', celebrate({
  body: schemaBodyUser,
}), updateData);

router.patch('/me/avatar', celebrate({
  body: schemaBodyAvatar,
}), updateAvatar);

router.get('/:id', celebrate({
  params: schemaParamUserId,
}), getUsersById);

module.exports = router;
