const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { regExpLink } = require('../scripts/utils/constants');
const { schemaHeaderAuth, schemaParamCardId } = require('../scripts/utils/clbSchemas');
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/', celebrate({
  headers: schemaHeaderAuth,
}), getCards);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().regex(regExpLink).required(),
  }),
  headers: schemaHeaderAuth,
}), createCard);

router.delete('/:cardId', celebrate({
  params: schemaParamCardId,
  headers: schemaHeaderAuth,
}), deleteCard);

router.put('/:cardId/likes', celebrate({
  params: schemaParamCardId,
  headers: schemaHeaderAuth,
}), likeCard);

router.delete('/:cardId/likes', celebrate({
  params: schemaParamCardId,
  headers: schemaHeaderAuth,
}), dislikeCard);

module.exports = router;
