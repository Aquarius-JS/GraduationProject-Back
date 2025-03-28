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
 * 获取除 content 字段外的其他所有字段
 * @returns
 */
async function selectAnnouncementBasicInfo() {
  const connection = await createConnection();
  const [results] = await connection.query(
    'SELECT id, title, publish_time, expire_time, status, updated_at FROM `announcement`'
  );
  connection.end();
  return results;
}

exports.selectAnnouncementBasicInfo = selectAnnouncementBasicInfo;
