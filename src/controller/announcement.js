const { selectAnnouncementBasicInfo, selectAnnouncementInfoById } = require('../model/announcement');

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

exports.getAnnouncementBasicInfo = getAnnouncementBasicInfo;
exports.getAnnouncementInfoById = getAnnouncementInfoById;
