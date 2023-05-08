class ValidationError extends Error {
  constructor(message = 'Данные не прошли валидацию') {
    super(message);
    this.name = 'VALID_ERROR';
    this.statusCode = 401;
  }
}

module.exports = ValidationError;
