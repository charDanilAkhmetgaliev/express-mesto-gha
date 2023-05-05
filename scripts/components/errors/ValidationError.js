class ValidationError extends Error {
  constructor() {
    super();
    this.name = 'ValidationError';
    this.statusCode = 401;
    this.message = 'Данные не прошли валидацию';
  }
}

module.exports = ValidationError;
