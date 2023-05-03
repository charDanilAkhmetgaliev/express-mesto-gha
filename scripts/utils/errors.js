const CastError = require('../components/errors/CastError');
const ValidationError = require('../components/errors/ValidationError');
const HttpError = require('../components/errors/HttpError');
const DuplicateError = require('../components/errors/DuplicateError');

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
        handlerSendError(res, new CastError(err.message));
        break;
      default:
        handlerSendError(res, new HttpError());
    }
  }
};

module.exports = {
  handlerError,
};
