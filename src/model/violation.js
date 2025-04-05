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
 * @param {*} title
 * @param {*} content
 * @param {*} reporting_time
 * @param {*} reporting_source
 * @param {*} status
 */
async function createViolationInfo(id, license_number, title, content, reporting_time, reporting_source, status) {
  const connection = await createConnection();
  await connection.query(
    'INSERT INTO `violation_info` (id, license_number, title, content,reporting_time, reporting_source, status) VALUES (?,?,?,?,?,?,?)',
    [id, license_number, title, content, reporting_time, reporting_source, status]
  );
  connection.end();
}

exports.createViolationInfo = createViolationInfo;
