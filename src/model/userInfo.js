// 导入模块
const mysql = require('mysql2/promise');

// 创建一个数据库连接
async function createConnection() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'graduationproject',
  });
  return connection;
}

async function getUserInfoByStuNumber(stuNumber) {
  const connection = await createConnection();
  const [results] = await connection.query('SELECT * FROM `user_info` WHERE `stu_number` = ?', [stuNumber]);
  connection.end();
  return results;
}

exports.getUserInfoByStuNumber = getUserInfoByStuNumber;
