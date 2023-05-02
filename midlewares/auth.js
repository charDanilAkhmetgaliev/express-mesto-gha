const jwt = require('jsonwebtoken');
const { handlerSendError } = require('../scripts/utils/errors');
const AuthorizationError = require('../scripts/components/errors/AuthorizationError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization && authorization.startsWith('Bearer ')) {
    const { JWT_SECRET } = process.env;
    const token = authorization.replace('Bearer ', '');
    let payload;

    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      handlerSendError(res, new AuthorizationError('не корректный jwt'));
      return;
    }

    req.user = payload;

    next();
  } else {
    handlerSendError(res, new AuthorizationError('jwt не найден'));
  }
};
