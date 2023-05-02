const CastError = require('../components/errors/CastError');
const ValidationError = require('../components/errors/ValidationError');
const HttpError = require('../components/errors/HttpError');

const handlerSendError = (res, err) => {
  res.status(err.statusCode).send({ ERROR: err.name, message: err.message });
};

const handlerError = (err, res) => {
  switch (err.name) {
    case 'ValidationError':
      handlerSendError(res, new ValidationError(err.message));
      break;
    case 'CastError':
      handlerSendError(res, new CastError(err.message));
      break;
    case 'AUTH_ERROR':
      handlerSendError(res, err);
      break;
    default:
      handlerSendError(res, new HttpError(err.message));
  }
};

module.exports = {
  handlerError,
  handlerSendError,
};
