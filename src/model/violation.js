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
  status
) {
  const connection = await createConnection();
  await connection.query(
    'INSERT INTO `violation_info` (id, license_number, violation_title, violation_content, detection_location, img_list, reporting_time, reporting_source, status) VALUES (?,?,?,?,?,?,?,?,?)',
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

exports.createViolationInfo = createViolationInfo;
exports.selectViolationInfo = selectViolationInfo;
