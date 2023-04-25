const User = require('../models/user');
const { handlerSendError, handlerError } = require('../scripts/utils/errors');
const DataIncorrectError = require('../scripts/utils/DataIncorrectError');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => handlerError(err, res));
};

module.exports.getUsersById = (req, res) => {
  const userId = req.params.id;
  User.findById(userId)
    .orFail(() => {
      throw new DataIncorrectError(`пользователь с id ${userId} не найден`);
    })
    .then((user) => res.send(user))
    .catch((err) => handlerError(err, res));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => handlerError(err, res));
};

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

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  if (avatar) {
    User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
      .then((user) => res.send(user))
      .catch((err) => handlerError(err, res));
  } else {
    handlerSendError(res, new DataIncorrectError('данные не заполнены'));
  }
};
