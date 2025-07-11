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
 * 根据车牌号查询车辆登记信息列表
 * @param {*} license_number
 * @returns
 */
async function selectVehicelRegisterInfoByLicense(license_number) {
  const connection = await createConnection();
  const [results] = await connection.query('SELECT * FROM `vehicle_registration_info` WHERE `license_number` = ?', [
    license_number,
  ]);
  connection.end();
  return results;
}

exports.selectVehicelRegisterInfoByLicense = selectVehicelRegisterInfoByLicense;
