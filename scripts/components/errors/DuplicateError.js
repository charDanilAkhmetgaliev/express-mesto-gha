class DuplicateError extends Error {
  constructor(message = 'Данный объект уже существует') {
    super(message);
    this.name = 'DUPLICATE_ERROR';
    this.statusCode = 409;
  }
}

module.exports = DuplicateError;
