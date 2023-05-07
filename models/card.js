const mongoose = require('mongoose');
const RootsNotExist = require('../scripts/components/errors/RootsNotExist');
const ObjectNotFoundError = require('../scripts/components/errors/ObjectNotFoundError');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    validator: URL,
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

cardSchema.statics.deleteCardById = function deleteCard(cardId, userId) {
  return this.findById(cardId)
    .then((card) => {
      if (card) {
        if (userId === card.owner.toString()) {
          return this.deleteOne(card)
            .then((cardDeleted) => cardDeleted);
        }
        throw new RootsNotExist('Вы не являетесь владельцем данной карточки');
      } else {
        throw new ObjectNotFoundError(`Карточка с id: ${cardId} не найдена`);
      }
    });
};

module.exports = mongoose.model('card', cardSchema);
