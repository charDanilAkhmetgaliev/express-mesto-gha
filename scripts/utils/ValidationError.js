const DataIncorrectError = require('./DataIncorrectError');

class ValidationError extends DataIncorrectError {
  constructor() {
    super();
    this.name = 'ValidationError';
    this.message = 'Данные не прошли валидацию';
  }
}

module.exports = ValidationError;
