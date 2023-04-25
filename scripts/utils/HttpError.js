class HttpError extends Error {
  constructor(message) {
    super();
    this.name = 'DEF_ERROR';
    this.statusCode = 500;
    this.message = `Произошла ошибка сервера, с сообщением: ${message}`;
  }
}

module.exports = HttpError;
