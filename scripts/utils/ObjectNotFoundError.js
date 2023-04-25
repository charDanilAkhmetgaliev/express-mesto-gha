const HttpError = require('./HttpError');

class ObjectNotFoundError extends HttpError {
  constructor() {
    super();
    this.name = 'OBJECT_ERROR';
    this.statusCode = 404;
    this.message = 'Запрашиваемый объект не найден';
  }
}

module.exports = ObjectNotFoundError;
