const DataIncorrectError = require('./DataIncorrectError');

class CastError extends DataIncorrectError {
  constructor() {
    super();
    this.name = 'CAST_ERROR';
    this.message = 'Передан некорректный id';
  }
}

module.exports = CastError;
