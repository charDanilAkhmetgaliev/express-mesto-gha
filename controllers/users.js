// packages imports
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
// utils imports
const { handlerValidation } = require('../scripts/utils/validator');
// errors classes imports
const IdNotFoundError = require('../scripts/components/errors/IdNotFoundError');
const AuthorizationError = require('../scripts/components/errors/AuthorizationError');
// todo удалить
const JWT_SECRET = '8b25b382b1a5b75ace37f19d5d26aabe35e68e5898851f9b9078ee9ce29ce9bf';

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
      throw new IdNotFoundError(userId)
    })
    .then((user) => res.send(user))
    .catch(next);
};
// create/register user controller
module.exports.createUser = async (req, res, next) => {
  try {
    handlerValidation(req, res);

    const {
      name, about, avatar, email, password,
    } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      // todo добавить SALT ROUNDS из окружения Number(process.env.SALT_ROUNDS)
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

    const user = await User.findUserByCredentials(email, password, next);

    const userId = String(user._id);

    // todo добавить jwt-secret из окружения process.env.JWT_SECRET
    const token = jwt.sign({ _id: userId }, JWT_SECRET, { expiresIn: '1w' });

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
