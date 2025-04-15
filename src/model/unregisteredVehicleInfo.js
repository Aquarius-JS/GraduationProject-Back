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
 * create未登记车辆信息
 * @param {*} id
 * @param {*} license_number
 * @param {*} img_list
 * @param {*} reporting_time
 * @param {*} reporting_source
 */
async function createUnregisteredVehicleInfo(id, license_number, img_list, reporting_time, reporting_source) {
  const connection = await createConnection();
  await connection.query(
    'INSERT INTO `unregistered_vehicle_info` (id, license_number, img_list, reporting_time,reporting_source) VALUES (?,?,?,?,?)',
    [id, license_number, img_list, reporting_time, reporting_source]
  );
  connection.end();
}

exports.createUnregisteredVehicleInfo = createUnregisteredVehicleInfo;
