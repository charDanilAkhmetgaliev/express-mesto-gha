const CastError = require('./CastError');
const ValidationError = require('./ValidationError');
const HttpError = require('./HttpError');

const handlerSendError = (res, err) => {
  res.status(err.statusCode).send({ ERROR: err.name, message: err.message });
};

const handlerError = (err, res) => {
  switch (err.name) {
    case 'ValidationError':
      handlerSendError(res, new ValidationError());
      break;
    case 'CastError':
      handlerSendError(res, new CastError());
      break;
    default:
      handlerSendError(res, new HttpError());
  }
};

module.exports = {
  handlerError,
  handlerSendError,
};
