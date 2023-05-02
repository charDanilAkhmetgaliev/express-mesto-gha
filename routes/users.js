const router = require('express').Router();

const {
  getUsers, getUsersById, updateData, updateAvatar, getUserData,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/:id', getUsersById);

router.patch('/me', updateData);

router.patch('/me/avatar', updateAvatar);

router.get('/users/me', getUserData);

module.exports = router;
