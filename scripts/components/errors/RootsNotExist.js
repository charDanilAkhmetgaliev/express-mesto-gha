class RootsNotExist extends Error {
  constructor(message = 'У вас нет прав доступа') {
    super(message);
    this.name = 'ROOT_ERROR';
    this.statusCode = 403;
  }
}

module.exports = RootsNotExist;
