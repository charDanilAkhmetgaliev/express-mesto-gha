const ValidationError = require('./ValidationError');

class AuthorizationError extends ValidationError {
  constructor(message = 'Логин или пароль не верный') {
    super();
    this.name = 'AUTH_ERROR';
    this.message = message;
  }
}

module.exports = AuthorizationError;
