const { selectAnnouncementBasicInfo } = require('../model/announcement');

async function getAnnouncementBasicInfo(req, res) {
  const announcementBasicInfo = await selectAnnouncementBasicInfo();
  res.json(announcementBasicInfo);
}

exports.getAnnouncementBasicInfo = getAnnouncementBasicInfo;
