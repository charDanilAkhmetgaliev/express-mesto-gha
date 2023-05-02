const HttpError = require('./HttpError');

class AuthorizationError extends HttpError {
  constructor(message = 'Логин или пароль не верный') {
    super();
    this.name = 'AUTH_ERROR';
    this.statusCode = 401;
    this.message = message;
  }
}

module.exports = AuthorizationError;
