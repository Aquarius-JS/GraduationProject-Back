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

/**
 * 更新公告标题
 * @param {*} id
 * @param {*} title
 * @param {*} updated_at
 */
async function updateAnnouncementTitleAndTime(id, title, updated_at) {
  const connection = await createConnection();
  await connection.query('UPDATE `announcement` SET `title` = ?, updated_at = ? WHERE `id` = ?', [
    title,
    updated_at,
    id,
  ]);
  connection.end();
}

/**
 * 更新公告内容
 * @param {*} id
 * @param {*} content
 * @param {*} updated_at
 */
async function updateAnnouncementContentAndTime(id, content, updated_at) {
  const connection = await createConnection();
  await connection.query('UPDATE `announcement` SET `content` = ?, updated_at = ? WHERE `id` = ?', [
    content,
    updated_at,
    id,
  ]);
  connection.end();
}

/**
 * 更新公告状态sql
 * @param {*} id
 * @param {*} status
 */
async function updateAnnouncementStatus(id, status) {
  const connection = await createConnection();
  await connection.query('UPDATE `announcement` SET `status` = ? WHERE `id` = ?', [status, id]);
  connection.end();
}

async function updateAnnouncementPublishTime(id, publishTime) {
  const connection = await createConnection();
  await connection.query('UPDATE `announcement` SET `publish_time` = ? WHERE `id` = ?', [publishTime, id]);
  connection.end();
}

async function updateAnnouncementAttachedFileListInfo(id, listInfo) {
  const connection = await createConnection();
  await connection.query('UPDATE `announcement` SET `attached_file_list_info` = ? WHERE `id` = ?', [listInfo, id]);
  connection.end();
}

exports.selectAnnouncementBasicInfo = selectAnnouncementBasicInfo;
exports.selectAnnouncementInfoById = selectAnnouncementInfoById;
exports.createAnnouncement = createAnnouncement;
exports.updateAnnouncementTitleAndTime = updateAnnouncementTitleAndTime;
exports.updateAnnouncementContentAndTime = updateAnnouncementContentAndTime;
exports.updateAnnouncementStatus = updateAnnouncementStatus;
exports.updateAnnouncementPublishTime = updateAnnouncementPublishTime;
exports.updateAnnouncementAttachedFileListInfo = updateAnnouncementAttachedFileListInfo;
