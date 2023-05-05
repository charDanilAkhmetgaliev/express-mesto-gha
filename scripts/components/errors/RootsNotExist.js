class RootsNotExist extends Error {
  constructor(message = 'Нет прав доступа') {
    super();
    this.name = 'ROOT_ERROR';
    this.statusCode = 403;
    this.message = message;
  }
}

module.exports = RootsNotExist;
