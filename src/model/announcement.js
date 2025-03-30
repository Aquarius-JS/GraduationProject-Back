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

/**
 * 根据公告id查询公告详情
 * @param {*} id
 * @returns
 */
async function selectAnnouncementInfoById(id) {
  const connection = await createConnection();
  const [results] = await connection.query('SELECT * FROM `announcement` where id = ?', [id]);
  connection.end();
  return results[0];
}

/**
 * 创建公告sql
 * @param {*} params
 */
async function createAnnouncement(...args) {
  const connection = await createConnection();
  await connection.query(
    'INSERT INTO `announcement` (id, title, content, status,publish_time, expire_time, updated_at) VALUES (?,?,?,?,?,?,?)',
    [...args]
  );
  connection.end();
}

async function updateAnnouncementContentAndTime(id, content, updated_at) {
  const connection = await createConnection();
  await connection.query('UPDATE `announcement` SET `content` = ?, updated_at = ? WHERE `id` = ?', [
    content,
    updated_at,
    id,
  ]);
  connection.end();
}

exports.selectAnnouncementBasicInfo = selectAnnouncementBasicInfo;
exports.selectAnnouncementInfoById = selectAnnouncementInfoById;
exports.createAnnouncement = createAnnouncement;
exports.updateAnnouncementContentAndTime = updateAnnouncementContentAndTime;
