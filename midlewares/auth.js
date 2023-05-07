const jwt = require('jsonwebtoken');
const AuthorizationError = require('../scripts/components/errors/AuthorizationError');
const { JWT_SECRET } = require('../scripts/utils/constants');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    // todo взять из окружения
    // const { JWT_SECRET } = process.env;
    let payload;

    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      next(new AuthorizationError('не корректный jwt'));
      return;
    }

    req.user = payload;

    next();
  } else {
    next(new AuthorizationError('jwt не найден'));
  }
};
