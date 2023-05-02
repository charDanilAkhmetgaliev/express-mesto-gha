const DataIncorrectError = require('./DataIncorrectError');

class ValidationError extends DataIncorrectError {
  constructor() {
    super();
    this.name = 'ValidationError';
    this.statusCode = 401;
    this.message = 'Данные не прошли валидацию';
  }
}

module.exports = ValidationError;
