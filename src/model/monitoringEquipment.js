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
 * 查询所有设备信息
 * @returns
 */
async function selectMonitoringEquipment() {
  const connection = await createConnection();
  const [results] = await connection.query('SELECT * FROM `monitoring_equipment`');
  connection.end();
  return results;
}

exports.selectMonitoringEquipment = selectMonitoringEquipment;
