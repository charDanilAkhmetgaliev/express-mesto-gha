class ObjectNotFoundError extends Error {
  constructor(message = 'Запрашиваемый объект не найден') {
    super();
    this.name = 'OBJECT_ERROR';
    this.statusCode = 404;
    this.message = message;
  }
}

module.exports = ObjectNotFoundError;
