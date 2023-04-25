const DataIncorrectError = require('./DataIncorrectError');
const ObjectNotFoundError = require('./ObjectNotFoundError');

const handlerSendError = (res, err) => {
  res.status(err.statusCode).send({ ERROR: err.name, message: err.message });
};

const handlerError = (err, res) => {
  switch (err.name) {
    case 'ValidationError':
      handlerSendError(res, new DataIncorrectError(err.message));
      break;
    case 'CastError':
      handlerSendError(res, new ObjectNotFoundError(err.message));
      break;
    default:
      handlerSendError(res, err);
  }
};

module.exports = {
  handlerError,
  handlerSendError,
};