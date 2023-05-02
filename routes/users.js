const router = require('express').Router();

const {
  getUsers, getUsersById, createUser, updateData, updateAvatar, login,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/:id', getUsersById);

router.patch('/me', updateData);

router.patch('/me/avatar', updateAvatar);

router.post('/signin', login);

router.post('/signup', createUser);

module.exports = router;
