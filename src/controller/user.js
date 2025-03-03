const jwt = require('jsonwebtoken');
const { privateKey } = require('../config/appConfig');
const { cookieMaxAge, tokenMaxAge } = require('../config/userInfo');
const { getUserInfoByStuNumber, getVehicleInfoByStuNumber } = require('../model/userInfo');

/**
 * 根据学号密码进行登录
 * @param {Object} req
 * @param {Object} res
 */
async function login(req, res) {
  const { stuNumber, password } = req.body;
  const info = await getUserInfoByStuNumber(stuNumber);
  const stuInfo = info[0];
  if (stuInfo && stuInfo.password === password) {
    const token = jwt.sign({ stuNumber }, privateKey, { expiresIn: tokenMaxAge });
    res.cookie('token', token, { httpOnly: false, maxAge: cookieMaxAge });
    res.json({ isOk: true });
  } else {
    res.json({ isOk: false });
  }
}

/**
 * 根据登录token获取用户信息
 * @param {Object} req
 * @returns
 */
async function getUserInfo(req, res) {
  const token = req.cookies.token;
  const { stuNumber } = jwt.verify(token, privateKey);
  const userInfo = await getUserInfoByStuNumber(stuNumber);
  res.json(userInfo);
}

async function getStudentAndVehicleInfo(req, res) {
  const stuNumberByToken = req.stuNumberByToken;
  console.log(stuNumberByToken, 'stuNumberByToken');
  const [userInfo, vehicleInfo] = await Promise.all([
    getUserInfoByStuNumber(stuNumberByToken),
    getVehicleInfoByStuNumber(stuNumberByToken),
  ]);
  res.json({ userInfo, vehicleInfo });
}

exports.login = login;
exports.getUserInfo = getUserInfo;
exports.getStudentAndVehicleInfo = getStudentAndVehicleInfo;
