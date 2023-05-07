const router = require('express').Router();
const { celebrate } = require('celebrate');
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const { schemaParamCardId, schemaBodyCards } = require('../scripts/utils/clbSchemas');

router.get('/', getCards);

router.post('/', celebrate({
  body: schemaBodyCards,
}), createCard);

router.delete('/:cardId', celebrate({
  params: schemaParamCardId,
}), deleteCard);

router.put('/:cardId/likes', celebrate({
  params: schemaParamCardId,
}), likeCard);

router.delete('/:cardId/likes', celebrate({
  params: schemaParamCardId,
}), dislikeCard);

module.exports = router;
