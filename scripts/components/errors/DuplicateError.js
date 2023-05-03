class DuplicateError extends Error {
  constructor() {
    super();
    this.name = 'DUPLICATE_ERROR';
    this.statusCode = 409;
    this.message = 'Данный объект уже существует';
  }
}

module.exports = DuplicateError;
