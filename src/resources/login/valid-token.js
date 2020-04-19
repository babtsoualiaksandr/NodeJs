const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = require('../../common/config').JWT_SECRET_KEY;
const createError = require('http-errors');

const verify = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    throw createError(401, 'Access Denied');
  }
  try {
    const verified = jwt.verify(token.slice(7), JWT_SECRET_KEY);
    req.user = verified;
  } catch (error) {
    throw createError(400, 'Invalid Token');
  }
  next();
};

module.exports = verify;
