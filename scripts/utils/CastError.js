const DataIncorrectError = require('./DataIncorrectError');

class CastError extends DataIncorrectError {
  constructor() {
    super();
    this.message = 'Передан некорректный id';
  }
}

module.exports = CastError;
