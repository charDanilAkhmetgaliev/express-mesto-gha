class httpError extends Error {
  constructor(message) {
    super();
    this.name = 'DEF_ERROR';
    this.statusCode = 500;
    this.message = `Произошла ошибка сервера, с сообщением: ${message}`;
  }
}

class ObjectNotFoundError extends httpError {
  constructor(message) {
    super();
    this.name = 'OBJECT_ERROR';
    this.statusCode = 404;
    this.message = `Запрашиваемый объект не найден, сообщение: ${message}`;
  }
}

class DataIncorrectError extends httpError {
  constructor(message) {
    super();
    this.name = 'DATA_ERROR';
    this.statusCode = 400;
    this.message = `Переданы некорректные данные, сообщение: ${message}`;
  }
}

const handlerSendError = (res, err) => {
  res.status(err.statusCode).send({ ERROR: err.name, message: err.message });
};

const handlerError = (err, res) => {
  if (!err.statusCode) {
    const dataError = new DataIncorrectError(err.message);
    handlerSendError(res, dataError);
    return;
  }
  handlerSendError(res, err);
};

module.exports = {
  httpError,
  ObjectNotFoundError,
  DataIncorrectError,
  handlerError,
  handlerSendError,
};
