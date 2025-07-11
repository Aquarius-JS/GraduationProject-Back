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
 * 创新违规信息上报sql
 * @param {*} id
 * @param {*} license_number
 * @param {*} violation_title
 * @param {*} violation_content
 * @param {*} detection_location
 * @param {*} img_list
 * @param {*} reporting_time
 * @param {*} reporting_source
 * @param {*} status
 */
async function createViolationInfo(
  id,
  license_number,
  violation_title,
  violation_content,
  detection_location,
  img_list,
  reporting_time,
  reporting_source,
  status,
  have_read
) {
  const connection = await createConnection();
  await connection.query(
    'INSERT INTO `violation_info` (id, license_number, violation_title, violation_content, detection_location, img_list, reporting_time, reporting_source, status, have_read) VALUES (?,?,?,?,?,?,?,?,?,?)',
    [
      id,
      license_number,
      violation_title,
      violation_content,
      detection_location,
      img_list,
      reporting_time,
      reporting_source,
      status,
      have_read,
    ]
  );
  connection.end();
}

async function selectViolationInfo() {
  const connection = await createConnection();
  const [rows] = await connection.query('SELECT * FROM violation_info');
  connection.end();
  return rows;
}

async function selectViolationInfoById(id) {
  const connection = await createConnection();
  const [rows] = await connection.query('SELECT * FROM violation_info WHERE id = ?', [id]);
  connection.end();
  return rows[0];
}

async function updateViolationStatusAndRemarkById(id, status, remark) {
  const connection = await createConnection();
  await connection.query('UPDATE `violation_info` SET `status` = ?, remark = ? WHERE `id` = ?', [status, remark, id]);
  connection.end();
}

/**
 * 根据车牌号列表查询违规信息
 * @param {*} licenseNumberList
 * @returns
 */
async function selectViolationInfoByLicenseNumberList(licenseNumberList) {
  const connection = await createConnection();
  const [res] = await connection.query(
    'SELECT * FROM violation_info WHERE license_number IN (' +
      licenseNumberList.map(item => "'" + item + "'").join(',') +
      ')'
  );
  connection.end();
  return res;
}

async function updateViolationInfoToHaveReadById(id) {
  const connection = await createConnection();
  await connection.query('UPDATE `violation_info` SET `have_read` = 1 WHERE `id` = ?', [id]);
  connection.end();
}

async function updateViolationInfoStatusById(id, status) {
  const connection = await createConnection();
  await connection.query('UPDATE `violation_info` SET `status` = ? WHERE `id` = ?', [status, id]);
  connection.end();
}

async function updateViolationInfoAppealReasonById(id, appealReason) {
  const connection = await createConnection();
  await connection.query('UPDATE `violation_info` SET `appeal_reason` = ? WHERE `id` = ?', [appealReason, id]);
  connection.end();
}

async function updateViolationInfoAppealResponseById(id, appealResponse) {
  const connection = await createConnection();
  await connection.query('UPDATE `violation_info` SET `appeal_response` = ? WHERE `id` = ?', [appealResponse, id]);
  connection.end();
}

exports.createViolationInfo = createViolationInfo;
exports.selectViolationInfo = selectViolationInfo;
exports.selectViolationInfoById = selectViolationInfoById;
exports.updateViolationStatusAndRemarkById = updateViolationStatusAndRemarkById;
exports.selectViolationInfoByLicenseNumberList = selectViolationInfoByLicenseNumberList;
exports.updateViolationInfoToHaveReadById = updateViolationInfoToHaveReadById;
exports.updateViolationInfoStatusById = updateViolationInfoStatusById;
exports.updateViolationInfoAppealReasonById = updateViolationInfoAppealReasonById;
exports.updateViolationInfoAppealResponseById = updateViolationInfoAppealResponseById;
