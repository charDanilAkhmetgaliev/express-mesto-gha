const ObjectNotFoundError = require('./ObjectNotFoundError');

class ValidationError extends ObjectNotFoundError {
  constructor() {
    super();
    this.name = 'VALIDATION_ERROR';
    this.message = 'Данные не прошли валидацию';
  }
}

module.exports = ValidationError;
