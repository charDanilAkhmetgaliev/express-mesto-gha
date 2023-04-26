const ObjectNotFoundError = require('./ObjectNotFoundError');

class IdNotFoundError extends ObjectNotFoundError {
  constructor(id) {
    super();
    this.message = `id ${id} не найден`;
  }
}

module.exports = IdNotFoundError;
