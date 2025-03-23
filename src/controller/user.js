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
  creatVehicleRegistrationInfo,
} = require('../model/userInfo');
const fileStreamToResUrl = require('../service/share/base64url');
const curUnixDate = require('../service/share/curUnixDate');

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
async function getStuInfo(req, res) {
  const stuNumberByToken = req.stuNumberByToken;
  const userInfo = await getUserInfoByStuNumber(stuNumberByToken);
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
  vehicleInfo.sort((a, b) => b.filing_date - a.filing_date);
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

/**
 * 根据token信息中的stu_number获取登记车辆信息
 * @param {*} req
 * @param {*} res
 */
async function getVehicleInfoByStu(req, res) {
  const stuNumberByToken = req.stuNumberByToken;
  const vehicleInfo = await getVehicleInfoByStuNumber(stuNumberByToken);
  vehicleInfo.sort((a, b) => b.filing_date - a.filing_date);
  res.json(vehicleInfo);
}

/**
 * 车辆登记信息提交接口
 * @param {*} req
 * @param {*} res
 */
async function vehicleRegistration(req, res) {
  const id = curUnixDate(); // TODO: 生成唯一id
  const stu_number = req.stuNumberByToken;
  const license_number = req.body.license_number;
  const vehicle_type = req.body.vehicle_type;
  const vehicle_status = 1; //登记状态
  const stu_card_img = req.body.stu_card_img;
  const vehicle_img = req.body.vehicle_img;
  const license_img = req.body.license_img;
  const filing_date = curUnixDate();
  const remark = '';
  await creatVehicleRegistrationInfo(
    id,
    stu_number,
    license_number,
    vehicle_type,
    vehicle_status,
    stu_card_img,
    vehicle_img,
    license_img,
    filing_date,
    remark
  );
  res.send({
    isOk: true,
    message: '提交成功',
  });
}

exports.login = login;
exports.getStuInfo = getStuInfo;
exports.getStudentAndVehicleInfo = getStudentAndVehicleInfo;
exports.uploadStuAvatar = uploadStuAvatar;
exports.updateStuInfo = updateStuInfo;
exports.editPassword = editPassword;
exports.getVehicleInfoByStu = getVehicleInfoByStu;
exports.vehicleRegistration = vehicleRegistration;
