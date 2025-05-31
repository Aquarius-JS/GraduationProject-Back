// 导入模块
const mysql = require('mysql2/promise');
const mysqlConfig = require('../config/mysqlConfig');

/**
 * 创建数据库连接函数
 * @returns
 */
async function createConnection() {
  const connection = await mysql.createConnection(mysqlConfig);
  return connection;
}

/**
 * 根据学号获取用户信息
 * @param {string} stuNumber
 * @returns
 */
async function getUserInfoByStuNumber(stuNumber) {
  const connection = await createConnection();
  const [results] = await connection.query('SELECT * FROM `user_info` WHERE `stu_number` = ?', [stuNumber]);
  connection.end();
  return results[0];
}

async function getVehicleInfoByStuNumber(stuNumber) {
  const connection = await createConnection();
  const [vehicleInfoList] = await connection.query('SELECT * FROM `vehicle_registration_info` WHERE `stu_number` = ?', [
    stuNumber,
  ]);
  connection.end();
  return vehicleInfoList;
}

async function updateStuAvatar(stuNumber, avatarUrl) {
  const connection = await createConnection();
  await connection.query('UPDATE `user_info` SET `user_img` = ? WHERE `stu_number` = ?', [avatarUrl, stuNumber]);
  connection.end();
}

async function updateStuInfo(stuNumber, newInfo) {
  const connection = await createConnection();
  await connection.query(
    'UPDATE `user_info` SET `user_name` = ?, `phone_number` = ?, `email` = ? WHERE `stu_number` = ?',
    [newInfo.user_name, newInfo.phone_number, newInfo.email, stuNumber]
  );
  connection.end();
}

async function getPasswordByStuNumber(stuNumber) {
  const connection = await createConnection();
  const [results] = await connection.query('SELECT password FROM `user_info` WHERE `stu_number` = ?', [stuNumber]);
  connection.end();
  return results[0].password;
}

async function updatePassword(stuNumber, password) {
  const connection = await createConnection();
  await connection.query('UPDATE `user_info` SET `password` = ? WHERE `stu_number` = ?', [password, stuNumber]);
  connection.end();
}

async function creatVehicleRegistrationInfo(...args) {
  const connection = await createConnection();
  await connection.query('INSERT INTO `vehicle_registration_info` VALUES(?,?,?,?,?,?,?,?,?,?)', [...args]);
  connection.end();
}

/**
 * 修改车辆登记信息表
 */
async function updateVehicleRegisterInfo(...args) {
  const connection = await createConnection();
  await connection.query(
    'UPDATE `vehicle_registration_info` SET `license_number` = ?, `vehicle_type` = ?, `vehicle_status` = ?, `stu_card_img` = ?, `vehicle_img` = ?, `license_img` = ? WHERE `id` = ?',
    [...args]
  );
  connection.end();
}

async function getVehicleRegistrationInfo() {
  const connection = await createConnection();
  const [vehicleInfoList] = await connection.query('SELECT * FROM `vehicle_registration_info`');
  connection.end();
  return vehicleInfoList;
}

async function getVehicleRegistrationInfoById(id) {
  const connection = await createConnection();
  const [vehicleInfoList] = await connection.query('SELECT * FROM `vehicle_registration_info` where id = ?', [id]);
  connection.end();
  return vehicleInfoList[0];
}

/**
 * 根据申请id和修改申请表的 status
 * @param {*} id
 * @param {*} status
 */
async function updateVehicleRegistrationInfoById(id, status, remark = '') {
  const connection = await createConnection();
  await connection.query('UPDATE `vehicle_registration_info` SET `vehicle_status` = ?, `remark` = ?  WHERE `id` = ?', [
    status,
    remark,
    id,
  ]);
  connection.end();
}

exports.getUserInfoByStuNumber = getUserInfoByStuNumber;
exports.getVehicleInfoByStuNumber = getVehicleInfoByStuNumber;
exports.updateStuAvatar = updateStuAvatar;
exports.updateStuInfo = updateStuInfo;
exports.getPasswordByStuNumber = getPasswordByStuNumber;
exports.updatePassword = updatePassword;
exports.creatVehicleRegistrationInfo = creatVehicleRegistrationInfo;
exports.getVehicleRegistrationInfo = getVehicleRegistrationInfo;
exports.getVehicleRegistrationInfoById = getVehicleRegistrationInfoById;
exports.updateVehicleRegistrationInfoById = updateVehicleRegistrationInfoById;
exports.updateVehicleRegisterInfo = updateVehicleRegisterInfo;
