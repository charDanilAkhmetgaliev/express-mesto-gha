const HttpError = require('./HttpError');

class DataIncorrectError extends HttpError {
  constructor(message) {
    super();
    this.name = 'DATA_ERROR';
    this.statusCode = 400;
    this.message = `Переданы некорректные данные, сообщение: ${message}`;
  }
}

module.exports = DataIncorrectError;
