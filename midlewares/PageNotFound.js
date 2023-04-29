const { handlerSendError } = require('../scripts/utils/errors');
const ObjectNotFoundError = require('../scripts/utils/ObjectNotFoundError');

module.exports = (res) => {
  handlerSendError(res, new ObjectNotFoundError('Страница не найдена'));
}