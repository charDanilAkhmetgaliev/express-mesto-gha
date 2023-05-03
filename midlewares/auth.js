const jwt = require('jsonwebtoken');
const { handlerSendError } = require('../scripts/utils/errors');
const AuthorizationError = require('../scripts/components/errors/AuthorizationError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization && authorization.startsWith('Bearer ')) {
    // todo взять из окружения
    const JWT_SECRET = '8b25b382b1a5b75ace37f19d5d26aabe35e68e5898851f9b9078ee9ce29ce9bf';
    // const { JWT_SECRET } = process.env;
    const token = authorization.replace('Bearer ', '');
    let payload;

    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      next(new AuthorizationError('не корректный jwt'));
    }

    req.user = payload;

    next();
  } else {
    next(new AuthorizationError('jwt не найден'));
  }
};
