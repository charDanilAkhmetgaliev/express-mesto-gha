const router = require('express').Router();

const {
  getUsers, getUsersById, createUser, updateData,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/:id', getUsersById);

router.post('/', createUser);

router.patch('/me', updateData);

router.patch('/me/avatar', updateData);

module.exports = router;
