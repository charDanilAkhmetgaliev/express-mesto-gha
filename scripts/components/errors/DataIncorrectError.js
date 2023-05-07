class DataIncorrectError extends Error {
  constructor(message = 'Переданы некорректные данные') {
    super(message);
    this.name = 'DATA_ERROR';
    this.statusCode = 400;
  }
}

module.exports = DataIncorrectError;
