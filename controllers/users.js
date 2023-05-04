// packages imports
const jwt = require('jsonwebtoken');
const User = require('../models/user');
// utils imports
const { handlerValidation } = require('../scripts/utils/validator');
// errors classes imports
const IdNotFoundError = require('../scripts/components/errors/IdNotFoundError');
const { JWT_SECRET } = require('../scripts/utils/constants');

// get all users controller
module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};
// get User by ID controller
module.exports.getUsersById = (req, res, next) => {
  const userId = req.params.id;
  User.findById(userId)
    .orFail(() => {
      throw new IdNotFoundError(userId);
    })
    .then((user) => res.send(user))
    .catch(next);
};
// create/register user controller
module.exports.createUser = async (req, res, next) => {
  try {
    handlerValidation(req, res);

    const newUser = await User.createUserByCredentials(req, next);

    res.send(newUser);
  } catch (err) {
    next(err);
  }
};
// update user data controller
module.exports.updateData = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch(next);
};
// update user avatar controller
module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch(next);
};
// login user controller
module.exports.login = async (req, res, next) => {
  try {
    handlerValidation(req, res);

    const { email, password } = req.body;

    const user = await User.findUserByCredentials(email, password);

    // todo добавить jwt-secret из окружения process.env.JWT_SECRET
    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '1w' });

    res.cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true }).send(user);
  } catch (err) {
    next(err);
  }
};
// get user data controller
module.exports.getUserData = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new IdNotFoundError(req.user._id);
    })
    .then((user) => res.send(user))
    .catch(next);
};
