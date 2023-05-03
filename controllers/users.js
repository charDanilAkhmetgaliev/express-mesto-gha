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
const AuthorizationError = require('../scripts/components/errors/AuthorizationError');
// todo удалить
const JWT_SECRET = '8b25b382b1a5b75ace37f19d5d26aabe35e68e5898851f9b9078ee9ce29ce9bf';

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
      // todo добавить SALT из окружения Number(process.env.SALT_ROUNDS)
      const hash = await bcrypt.hash(password, 10);

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
    // todo добавить jwt-secret из окружения process.env.JWT_SECRET
    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '1w' });

    res.cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true }).send(user);
  } catch (err) {
    handlerError(err, res);
  }
};
// get user data controller
module.exports.getUserData = (req, res) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new IdNotFoundError(req.user._id);
    })
    .then((user) => res.send(user))
    .catch((err) => handlerError(err, res));
};
