const ValidationError = require('../components/errors/ValidationError');
const DuplicateError = require('../components/errors/DuplicateError');
const DataIncorrectError = require('../components/errors/DataIncorrectError');

const handlerSendError = (res, err) => {
  res.status(err.statusCode).send({ ERROR: err.name, message: err.message });
};

const handlerError = (err, res) => {
  if (err.statusCode) {
    handlerSendError(res, err);
  } else if (err.code === 11000) {
    handlerSendError(res, new DuplicateError());
  } else {
    switch (err.name) {
      case 'ValidationError':
        handlerSendError(res, new ValidationError(err.message));
        break;
      case 'CastError':
        handlerSendError(res, new DataIncorrectError());
        break;
      default:
        res.status(500).send({ ERROR: 'SERVER_ERROR', message: 'Произошла ошибка сервера' });
    }
  }
};

module.exports = {
  handlerError,
};
