const jwt = require('jsonwebtoken');
const { privateKey } = require('../config/appConfig');
const { cookieMaxAge, tokenMaxAge } = require('../config/userInfo');
const {
  getUserInfoByStuNumber,
  getVehicleInfoByStuNumber,
  updateStuAvatar,
  updateStuInfo: updateStuInfoModel,
  getPasswordByStuNumber,
  updatePassword,
} = require('../model/userInfo');
const fileStreamToResUrl = require('../service/base64url');

/**
 * 根据学号密码进行登录
 * @param {Object} req
 * @param {Object} res
 */
async function login(req, res) {
  const { stuNumber, password } = req.body;
  const info = await getUserInfoByStuNumber(stuNumber);
  if (info && info.password === password) {
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

/**
 * 获取学生信息和其车辆登记信息
 * @param {*} req
 * @param {*} res
 */
async function getStudentAndVehicleInfo(req, res) {
  const stuNumberByToken = req.stuNumberByToken;
  const [userInfo, vehicleInfo] = await Promise.all([
    getUserInfoByStuNumber(stuNumberByToken),
    getVehicleInfoByStuNumber(stuNumberByToken),
  ]);
  res.json({ userInfo, vehicleInfo });
}

/**
 * 上传学生头像
 * @param {*} req
 * @param {*} res
 */
async function uploadStuAvatar(req, res) {
  const resUrl = await fileStreamToResUrl(req);
  await updateStuAvatar(req.stuNumberByToken, resUrl);
  res.json({ resUrl });
}

/**
 * 更新用户信息
 * @param {*} req
 * @param {*} res
 */
async function updateStuInfo(req, res) {
  await updateStuInfoModel(req.stuNumberByToken, req.body);
  res.json({ isOk: true });
}

/**
 * 学生修改密码
 * @param {*} req
 * @param {*} res
 */
async function editPassword(req, res) {
  const { oldHashPassword, newHashPassword } = req.body;
  const password = await getPasswordByStuNumber(req.stuNumberByToken);
  if (password !== oldHashPassword) {
    res.send({ isOk: false, message: '原密码错误' });
  } else {
    await updatePassword(req.stuNumberByToken, newHashPassword);
    res.send({ isOk: true, message: '密码修改成功' });
  }
}

exports.login = login;
exports.getUserInfo = getUserInfo;
exports.getStudentAndVehicleInfo = getStudentAndVehicleInfo;
exports.uploadStuAvatar = uploadStuAvatar;
exports.updateStuInfo = updateStuInfo;
exports.editPassword = editPassword;
