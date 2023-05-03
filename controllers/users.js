// packages imports
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
// utils imports
const { handlerSendError, handlerError } = require('../scripts/utils/errors');
const { handlerValidation } = require('../scripts/utils/validator');
// errors classes imports
const DataIncorrectError = require('../scripts/components/errors/DataIncorrectError');
const IdNotFoundError = require('../scripts/components/errors/IdNotFoundError');
const ObjectNotFoundError = require('../scripts/components/errors/ObjectNotFoundError');
const AuthorizationError = require('../scripts/components/errors/AuthorizationError');
// get all users controller
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => handlerError(err, res));
};
// get User by ID controller
module.exports.getUsersById = (req, res) => {
  const userId = req.params.id;
  User.findById(userId)
    .orFail(() => handlerSendError(res, new IdNotFoundError(userId)))
    .then((user) => res.send(user))
    .catch((err) => handlerError(err, res));
};
// create/register user controller
module.exports.createUser = async (req, res) => {
  try {
    handlerValidation(req, res);

    const {
      name, about, avatar, email, password,
    } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      const hash = await bcrypt.hash(password, process.env.SALT_ROUNDS.toInt());

      const newUser = await User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      });

      res.send(newUser);
    } else {
      throw new AuthorizationError('Пользователь с таким email уже существует');
    }
  } catch (err) {
    handlerError(err, res);
  }
};
// update user data controller
module.exports.updateData = (req, res) => {
  const { name, about } = req.body;

  if (name || about) {
    User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
      .then((user) => res.send(user))
      .catch((err) => handlerError(err, res));
  } else {
    handlerSendError(res, new DataIncorrectError('данные не заполнены'));
  }
};
// update user avatar controller
module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => handlerError(err, res));
};
// login user controller
module.exports.login = async (req, res) => {
  try {
    handlerValidation(req, res);

    const { email, password } = req.body;

    const user = await User.findUserByCredentials(email, password);

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1w' });

    res.cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true }).send(user);
  } catch (err) {
    handlerError(err, res);
  }
};

module.exports.getUserData = (req, res) => {
  User.findById(req.user)
    .then((user) => res.send(user))
    .catch(() => handlerSendError(res, new ObjectNotFoundError('Пользователь не найден')));
};
