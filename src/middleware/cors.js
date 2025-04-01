/**
 * 跨域cors中间件
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const myCors = (req, res, next) => {
  const origin = req.headers.origin;
  res.setHeader('Access-Control-Allow-Origin', origin ?? '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('access-control-allow-headers', 'content-type,suffix');
  res.setHeader('access-control-allow-methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  next();
};

module.exports = myCors;
