const User = require('../models/user');
const { handlerErrors } = require('../utils/errors');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => handlerErrors(err, res));
};

module.exports.getUsersById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.send(user))
    .catch((err) => handlerErrors(err, res));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => handlerErrors(err, res));
};

module.exports.updateData = (req, res) => {
  const { name, about, avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about, avatar }, { new: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => handlerErrors(err, res));
};
