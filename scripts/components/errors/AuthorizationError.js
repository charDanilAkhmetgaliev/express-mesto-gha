const HttpError = require('./HttpError');

class AuthorizationError extends HttpError {
  constructor() {
    super();
    this.name = "AUTH_ERROR"
    this.statusCode = 401;
    this.message = 'Логин или пароль не верный';
  }
}

module.exports = AuthorizationError;
