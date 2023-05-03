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

cardSchema.statics.deleteCardById = async function deleteCard(req, res) {
  return this.findById(req.params.cardId)
    .then((card) => {
      if (card) {
        if (req.user._id === card.owner.toString()) {
          return this.findByIdAndDelete(req.params.cardId)
            .then((cardDeleted) => cardDeleted)
            .catch((err) => handlerError(err, res));
        }
        throw new RootsNotExist('Вы не являетесь владельцем данной карточки');
      } else {
        throw new IdNotFoundError(req.params.cardId);
      }
    })
    .catch((err) => handlerError(err, res));
};

module.exports = mongoose.model('card', cardSchema);
