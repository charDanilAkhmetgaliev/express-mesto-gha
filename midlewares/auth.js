const jwt = require('jsonwebtoken');
const AuthorizationError = require('../scripts/components/errors/AuthorizationError');
const { JWT_SECRET } = require('../scripts/utils/constants');

module.exports = (req, res, next) => {
  const { cookie } = req.headers;

  if (cookie && cookie.startsWith('jwt=')) {
    // todo взять из окружения
    // const { JWT_SECRET } = process.env;
    const token = cookie.replace('jwt=', '');
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
