const mongoose = require('mongoose');
const { handlerError } = require('../scripts/utils/errors');
const RootsNotExist = require('../scripts/components/errors/RootsNotExist');
const IdNotFoundError = require('../scripts/components/errors/IdNotFoundError');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

cardSchema.statics.deleteCardById = function deleteCard(req, res, next) {
  return this.findById(req.params.cardId)
    .then((card) => {
      if (card) {
        if (req.user._id === card.owner.toString()) {
          return this.findByIdAndDelete(req.params.cardId)
            .then((cardDeleted) => cardDeleted)
            .catch(next);
        }
        throw new RootsNotExist('Вы не являетесь владельцем данной карточки');
      } else {
        throw new IdNotFoundError(req.params.cardId);
      }
    })
    .catch(next);
};

module.exports = mongoose.model('card', cardSchema);
