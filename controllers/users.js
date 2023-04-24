const User = require('../models/user');
const {
  httpError, ObjectNotFoundError, DataIncorrectError, IdNotFoundError,
} = require('../utils/errors');

const handlerSendError = (res, err) => {
  res.status(err.statusCode).send({ ERROR: err.name, message: err.message });
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
  const { name, about } = req.body;

  if (name || about) {
    const nameLength = name?.length || 0;
    const aboutLength = about?.length || 0;

    if ((nameLength >= 2 && nameLength <= 30) || (aboutLength >= 2 && aboutLength <= 30)) {
      User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
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

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  if (avatar) {
   User.findByIdAndUpdate(req.user._id, { avatar }, { new: true})
    .then((user) => res.send(user))
    .catch(err => handlerError(err, res))
   return;
  }
  const err = new DataIncorrectError('данные не заполнены');
  handlerSendError(res, err);
}