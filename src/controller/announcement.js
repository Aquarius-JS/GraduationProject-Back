const curUnixDate = require('../service/share/curUnixDate');
const {
  selectAnnouncementBasicInfo,
  selectAnnouncementInfoById,
  createAnnouncement,
  updateAnnouncementTitleAndTime,
  updateAnnouncementContentAndTime,
  updateAnnouncementStatus,
  updateAnnouncementPublishTime,
  updateAnnouncementAttachedFileListInfo,
} = require('../model/announcement');

/**
 * 获取公告基本信息列表
 * @param {*} req
 * @param {*} res
 */
async function getAnnouncementBasicInfo(req, res) {
  const announcementBasicInfo = await selectAnnouncementBasicInfo();
  res.json(announcementBasicInfo);
}

/**
 * 根据公告id获取公告信息
 * @param {*} req
 * @param {*} res
 */
async function getAnnouncementInfoById(req, res) {
  const announcementId = req.body.announcementId;
  const announcementInfo = await selectAnnouncementInfoById(announcementId);
  res.json(announcementInfo);
}

/**
 * 新增公告 接口
 * @param {*} req
 * @param {*} res
 */
async function addAnnouncementInfo(req, res) {
  const id = curUnixDate();
  const title = req.body?.title ?? '';
  const content = res.body?.content ?? '';
  const status = res.body?.status ?? 1; //默认为未发布状态
  const publish_time = null;
  const expire_time = null;
  const updated_at = curUnixDate();
  await createAnnouncement(id, title, content, status, publish_time, expire_time, updated_at);
  res.json({ isOk: true, message: '操作成功', data: { id } });
}

/**
 * 根据id更新公告标题
 * @param {*} req
 * @param {*} res
 */
async function updateAnnouncementTitleById(req, res) {
  const id = req.body.announcementId;
  const title = req.body.title;
  const updated_at = curUnixDate();
  await updateAnnouncementTitleAndTime(id, title, updated_at);
  res.json({ isOk: true, message: '更新成功' });
}

/**
 * 根据id更新公告内容
 * @param {*} req
 * @param {*} res
 */
async function updateAnnouncementContentById(req, res) {
  const id = req.body.announcementId;
  const content = req.body.content;
  const updated_at = curUnixDate();
  await updateAnnouncementContentAndTime(id, content, updated_at);
  res.json({ isOk: true, message: '保存成功' });
}

/**
 * 发布公告接口
 * @param {*} req
 * @param {*} res
 * @returns
 */
async function publishAnnouncement(req, res) {
  const id = req.body.announcementId;
  const announcementInfo = await selectAnnouncementInfoById(id);
  if (announcementInfo.status !== 1) {
    res.json({ isOk: false, message: '信息已过期，请稍后重试' });
    return;
  }
  await updateAnnouncementStatus(id, 2);
  await updateAnnouncementPublishTime(id, curUnixDate());
  res.json({ isOk: true, message: '发布成功' });
}

/**
 * 取消发布接口
 * @param {*} req
 * @param {*} res
 * @returns
 */
async function unpublishAnnouncement(req, res) {
  const id = req.body.announcementId;
  const announcementInfo = await selectAnnouncementInfoById(id);
  if (announcementInfo.status !== 2) {
    res.json({ isOk: false, message: '信息已过期，请稍后重试' });
    return;
  }
  await updateAnnouncementStatus(id, 1);
  await updateAnnouncementPublishTime(id, null);
  res.json({ isOk: true, message: '取消发布成功' });
}

/**
 * 删除接口，将status改为状态3
 * @param {*} req
 * @param {*} res
 */
async function deleteAnnouncement(req, res) {
  const id = req.body.announcementId;
  await updateAnnouncementStatus(id, 3);
  res.json({ isOk: true, message: '操作成功' });
}

async function updateAttachedFileListInfo(req, res) {
  const id = req.body.announcementId;
  const listInfo = JSON.stringify(req.body.listInfo);
  await updateAnnouncementAttachedFileListInfo(id, listInfo);
  res.json({ isOk: true, message: '保存成功' });
}

exports.getAnnouncementBasicInfo = getAnnouncementBasicInfo;
exports.getAnnouncementInfoById = getAnnouncementInfoById;
exports.addAnnouncementInfo = addAnnouncementInfo;
exports.updateAnnouncementTitleById = updateAnnouncementTitleById;
exports.updateAnnouncementContentById = updateAnnouncementContentById;
exports.publishAnnouncement = publishAnnouncement;
exports.unpublishAnnouncement = unpublishAnnouncement;
exports.deleteAnnouncement = deleteAnnouncement;
exports.updateAttachedFileListInfo = updateAttachedFileListInfo;
