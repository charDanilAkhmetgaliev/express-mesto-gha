const router = require('express').Router();

const {
  getUsers, getUsersById, createUser, updateData, updateAvatar, login, getUserData,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/:id', getUsersById);

router.patch('/me', updateData);

router.patch('/me/avatar', updateAvatar);

router.post('/signin', login);

router.post('/signup', createUser);

router.get('/users/me', getUserData);

module.exports = router;
