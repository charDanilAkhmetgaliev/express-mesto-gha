class HttpError extends Error {
  constructor() {
    super();
    this.name = 'DEF_ERROR';
    this.statusCode = 500;
    this.message = 'Произошла неизвестная ошибка';
  }
}

module.exports = HttpError;
