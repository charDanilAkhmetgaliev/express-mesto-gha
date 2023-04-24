const DEF_CODE = 500;
const DATA_CODE = 400;
const OBJECT_CODE = 404;

const DEF_MESSAGE = 'Произошла ошибка сервера';
const DATA_MESSAGE = 'Переданы некорректные данные';
const OBJECT_MESSAGE = 'Запрашиваемый объект не найден';

class httpError extends Error {
  constructor(message) {
    super();
    this.name = 'DEF_ERROR';
    this.statusCode = DEF_CODE;
    this.message = `Произошла ошибка сервера, с сообщением: ${message}`;
  }
}

class ObjectNotFoundError extends httpError {
  constructor(message) {
    super();
    this.name = 'OBJECT_ERROR';
    this.statusCode = OBJECT_CODE;
    this.message = `Запрашиваемый объект не найден, сообщение: ${message}`;
  }
}

class DataIncorrectError extends httpError {
  constructor(message) {
    super();
    this.name = 'DATA_ERROR';
    this.statusCode = DATA_CODE;
    this.message = `Переданы некорректные данные, сообщение: ${message}`;
  }
}

class IdNotFoundError extends ObjectNotFoundError {
  constructor(id) {
    super();
    this.message = `Пользователь с id: ${id} не найден`;
  }
}

class FieldIncorrectSizeError extends DataIncorrectError {
  constructor() {
    super();
    this.message = 'имя или описание меньше 2 или больше 30 символов';
  }
}

module.exports = {
  httpError,
  ObjectNotFoundError,
  DataIncorrectError,
  IdNotFoundError,
  FieldIncorrectSizeError
};
