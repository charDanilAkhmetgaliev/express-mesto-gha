const router = require('express').Router();

const {
  getUsers, getUsersById, createUser, updateData, updateAvatar
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/:id', getUsersById);

router.post('/', createUser);

router.patch('/me', updateData);

router.patch('/me/avatar', updateAvatar);

module.exports = router;
