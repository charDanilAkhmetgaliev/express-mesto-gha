const User = require('../models/user');
const {
  httpError, ObjectNotFoundError, DataIncorrectError, IdNotFoundError,
} = require('../utils/errors');

const handlerSendError = (res, err) => {
  res.status(err.statusCode).send({ ERROR: err.name, MESSAGE: err.message });
};

const handlerError = (err, res) => {
  if (!err.statusCode) {
    const dataError = new DataIncorrectError(err.message);
    handlerSendError(res, dataError);
    return;
  }
  handlerSendError(res, err);
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

  if (name || about || avatar) {
    const nameLength = name?.length || 0;
    const aboutLength = about?.length || 0;

    const averageSumLengths = (nameLength + aboutLength) / 2;

    if (averageSumLengths < 15 && averageSumLengths > 2) {
      User.findByIdAndUpdate(req.user._id, { name, about, avatar }, { new: true })
        .then((user) => res.send(user))
        .catch((err) => handlerError(err, res));
      return;
    }
    const err = new DataIncorrectError('имя или описание меньше 2 или больше 30 символов');
    handlerSendError(res, err);
    return;
  }
  const err = new DataIncorrectError('данные не заполнены');
  handlerSendError(res, err);
};
