class DataIncorrectError extends Error {
  constructor(message = 'Переданы некорректные данные') {
    super();
    this.name = 'DATA_ERROR';
    this.statusCode = 400;
    this.message = message;
  }
}

module.exports = DataIncorrectError;
