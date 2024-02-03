/* eslint-disable linebreak-style */
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('./errors/UnauthorizedError');
const { NODE_ENV, JWT_SECRET } = require('../utils/utils');

const handleAuthError = (next) => {
  next(new UnauthorizedError('Необходима авторизация'));
};

const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(next);
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV ? JWT_SECRET : 'super-secret-key');
  } catch (error) {
    return handleAuthError(next);
  }

  req.user = payload;

  return next();
};
