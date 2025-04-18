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
 * @param {*} detection_location
 * @param {*} img_list
 * @param {*} reporting_time
 * @param {*} reporting_source
 */
async function createUnregisteredVehicleInfo(
  id,
  license_number,
  detection_location,
  img_list,
  reporting_time,
  reporting_source
) {
  const connection = await createConnection();
  await connection.query(
    'INSERT INTO `unregistered_vehicle_info` (id, license_number, detection_location, img_list, reporting_time,reporting_source) VALUES (?,?,?,?,?,?)',
    [id, license_number, detection_location, img_list, reporting_time, reporting_source]
  );
  connection.end();
}

async function selectUnregisteredVehicleInfo() {
  const connection = await createConnection();
  const [rows] = await connection.query('SELECT * FROM unregistered_vehicle_info');
  connection.end();
  return rows;
}

exports.createUnregisteredVehicleInfo = createUnregisteredVehicleInfo;
exports.selectUnregisteredVehicleInfo = selectUnregisteredVehicleInfo;
