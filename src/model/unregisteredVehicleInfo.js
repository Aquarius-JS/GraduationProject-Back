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
  reporting_source,
  status
) {
  const connection = await createConnection();
  await connection.query(
    'INSERT INTO `unregistered_vehicle_info` (id, license_number, detection_location, img_list, reporting_time,reporting_source,status) VALUES (?,?,?,?,?,?,?)',
    [id, license_number, detection_location, img_list, reporting_time, reporting_source, status]
  );
  connection.end();
}

async function selectUnregisteredVehicleInfo() {
  const connection = await createConnection();
  const [rows] = await connection.query('SELECT * FROM unregistered_vehicle_info');
  connection.end();
  return rows;
}

async function selectUnregisteredVehicleInfoById(id) {
  const connection = await createConnection();
  const [rows] = await connection.query('SELECT * FROM unregistered_vehicle_info where id = ?', [id]);
  connection.end();
  return rows[0];
}

async function updateUnregisteredInfoStatusAndRemarkById(id, status, remark) {
  const connection = await createConnection();
  await connection.query('UPDATE `unregistered_vehicle_info` SET `status` = ?, remark = ? WHERE `id` = ?', [
    status,
    remark,
    id,
  ]);
  connection.end();
}

exports.createUnregisteredVehicleInfo = createUnregisteredVehicleInfo;
exports.selectUnregisteredVehicleInfo = selectUnregisteredVehicleInfo;
exports.selectUnregisteredVehicleInfoById = selectUnregisteredVehicleInfoById;
exports.updateUnregisteredInfoStatusAndRemarkById = updateUnregisteredInfoStatusAndRemarkById;
