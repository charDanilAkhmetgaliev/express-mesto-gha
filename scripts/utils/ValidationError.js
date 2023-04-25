const DataIncorrectError = require('./DataIncorrectError');

class ValidationError extends DataIncorrectError {
  constructor() {
    super();
    this.name = 'VALIDATION_ERROR';
    this.message = 'Данные не прошли валидацию';
  }
}

module.exports = ValidationError;
