const jwt = require('jsonwebtoken');
const { privateKey } = require('../config/appConfig');

/**
 * 判断用户是否登录的中间件
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
async function isLoginMiddleware(req, res, next) {
  if (req.path === '/login') {
    next();
    return;
  }
  const token = req.cookies?.token;
  if (!token) {
    res.json({ isLogin: false, err: 'no token' });
  } else {
    jwt.verify(token, privateKey, (err, decoded) => {
      if (err) {
        res.json({ isLogin: false, err });
      } else {
        req.stuNumberByToken = decoded.stuNumber;
        next();
        return;
      }
    });
  }
}

exports.isLoginMiddleware = isLoginMiddleware;
