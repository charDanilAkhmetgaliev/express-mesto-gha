const Card = require('../models/card');
const { handlerError } = require('../scripts/utils/errors');
const ObjectNotFoundError = require('../scripts/utils/ObjectNotFoundError');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => handlerError(err, res));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => handlerError(err, res));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(() => {
      throw new ObjectNotFoundError(`карточка с id ${req.params.cardId} не найдена`);
    })
    .then((card) => res.send(card))
    .catch((err) => handlerError(err, res));
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail(() => {
      throw new ObjectNotFoundError(`карточка с id ${req.params.cardId} не найдена`);
    })
    .then((card) => res.send(card))
    .catch((err) => handlerError(err, res));
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(() => {
      throw new ObjectNotFoundError(`карточка с id ${req.params.cardId} не найдена`);
    })
    .then((card) => res.send(card))
    .catch((err) => handlerError(err, res));
};
