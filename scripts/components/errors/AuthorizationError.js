const ValidationError = require('./ValidationError');

class AuthorizationError extends ValidationError {
  constructor(message = 'Логин или пароль не верный') {
    super(message);
    this.name = 'AUTH_ERROR';
  }
}

module.exports = AuthorizationError;
