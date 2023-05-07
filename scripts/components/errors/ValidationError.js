class ValidationError extends Error {
  constructor(message = 'Данные не прошли валидацию') {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = 401;
  }
}

module.exports = ValidationError;
