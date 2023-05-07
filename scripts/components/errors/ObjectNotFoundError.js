class ObjectNotFoundError extends Error {
  constructor(message = 'Запрашиваемый объект не найден') {
    super(message);
    this.name = 'OBJECT_ERROR';
    this.statusCode = 404;
  }
}

module.exports = ObjectNotFoundError;
