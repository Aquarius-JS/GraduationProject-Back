// 导入模块
const mysql = require('mysql2/promise');

/**
 * 创建数据库连接函数
 * @returns
 */
async function createConnection() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'graduationproject',
  });
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

exports.getUserInfoByStuNumber = getUserInfoByStuNumber;
exports.getVehicleInfoByStuNumber = getVehicleInfoByStuNumber;
exports.updateStuAvatar = updateStuAvatar;
exports.updateStuInfo = updateStuInfo;
