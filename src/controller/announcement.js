const curUnixDate = require('../service/share/curUnixDate');
const {
  selectAnnouncementBasicInfo,
  selectAnnouncementInfoById,
  createAnnouncement,
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

exports.getAnnouncementBasicInfo = getAnnouncementBasicInfo;
exports.getAnnouncementInfoById = getAnnouncementInfoById;
exports.addAnnouncementInfo = addAnnouncementInfo;
