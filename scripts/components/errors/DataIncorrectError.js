const HttpError = require('./HttpError');

class DataIncorrectError extends HttpError {
  constructor(message = 'Переданы некорректные данные') {
    super();
    this.name = 'DATA_ERROR';
    this.statusCode = 400;
    this.message = message;
  }
}

module.exports = DataIncorrectError;
