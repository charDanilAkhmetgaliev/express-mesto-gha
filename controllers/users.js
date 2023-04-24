const User = require('../models/user');
const {
  httpError, ObjectNotFoundError, DataIncorrectError, IdNotFoundError,
} = require('../utils/errors');

const handlerSendError = (res, statusCode, name, message) => {
  res.status(statusCode).send({ ERROR: name, message });
}
const handlerError = (err, res) => {
  if (err.statusCode) {
    const { name, statusCode, message } = err;
    handlerSendError(res, statusCode, name, message);
  } else {
    const { name, statusCode, message } = new DataIncorrectError(err.message);
    handlerSendError(res, statusCode, name, message);
  }
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => handlerError(err, res));
};

module.exports.getUsersById = (req, res) => {
  const userId = req.params.id;
  User.findById(userId)
    .orFail(() => {
      throw new IdNotFoundError(userId);
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
  const { name, about, avatar } = req.body;

  if (!name && !about && !avatar) {
    res.status(400).send({ message: 'Переданы некорректные данные' });
    return;
  }

  User.findByIdAndUpdate(req.user._id, { name, about, avatar }, { new: true })
    .then((user) => res.send(user))
    .catch((err) => handlerError(err, res));
};
