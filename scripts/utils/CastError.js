const ObjectNotFoundError = require('./ObjectNotFoundError');

class CastError extends ObjectNotFoundError {
  constructor() {
    super();
    this.name = 'CAST_ERROR';
    this.message = 'Передан некорректный id';
  }
}

module.exports = CastError;
