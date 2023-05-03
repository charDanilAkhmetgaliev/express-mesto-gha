const router = require('express').Router();

const {
  getUsers, updateData, updateAvatar, getUserData, getUsersById,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/me', getUserData);

router.patch('/me', updateData);

router.patch('/me/avatar', updateAvatar);

router.get('/:id', getUsersById);

module.exports = router;
