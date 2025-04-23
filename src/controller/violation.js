const curUnixDate = require('../service/share/curUnixDate');
const {
  createViolationInfo,
  selectViolationInfo,
  selectViolationInfoById,
  updateViolationStatusAndRemarkById,
  selectViolationInfoByLicenseNumberList,
  updateViolationInfoToHaveReadById,
} = require('../model/violation');

/**
 * 违规信息上报接口
 * @param {*} req
 * @param {*} res
 */
async function violationInfoReporting(req, res) {
  const violationInfo = req.body;
  const id = curUnixDate();
  const license_number = violationInfo.licenseNumber.toUpperCase();
  const violation_title = violationInfo.violationTitle;
  const violation_content = violationInfo.violationContent;
  const detection_location = violationInfo.detectionLocation;
  const imgList = violationInfo.imgList;
  const reporting_time = curUnixDate();
  const reporting_source = violationInfo.reportingSource;
  const status = violationInfo.status ?? 0; //默认为0，表示未处理
  const have_read = 0; //默认为0，表示未读
  await createViolationInfo(
    id,
    license_number,
    JSON.stringify(violation_title),
    violation_content,
    detection_location,
    JSON.stringify(imgList),
    reporting_time,
    reporting_source,
    status,
    have_read
  );
  res.send({
    isOk: true,
    message: '违规信息上报成功',
  });
}

/**
 * 获取所有的违规信息
 * @param {*} req
 * @param {*} res
 */
async function getAllViolationInfo(req, res) {
  const violationInfo = await selectViolationInfo();
  res.send({
    isOk: true,
    message: '违规信息获取成功',
    data: violationInfo,
  });
}

/**
 * 违规信息审批接口
 * @param {*} req
 * @param {*} res
 */
async function approveViolationInfo(req, res) {
  const { id, status, remark } = req.body;
  const violationInfo = await selectViolationInfoById(id);
  if (!violationInfo) {
    return res.json({
      isOk: false,
      message: '信息不存在，请重试',
    });
  } else if (violationInfo.status !== 0) {
    return res.json({
      isOk: false,
      message: '信息状态已过期，请稍后重试',
    });
  } else {
    await updateViolationStatusAndRemarkById(id, status, remark);
    res.json({
      isOk: true,
      message: '审批信息提交成功',
      data: {
        id,
      },
    });
  }
  // const violationInfo = req.body;
}

/**
 * 根据车牌号数组获取违规信息
 * @param {*} req
 * @param {*} res
 */
async function getViolationInfoByLicenseNumberList(req, res) {
  const { licenseNumberList } = req.body;
  const violationInfo = await selectViolationInfoByLicenseNumberList(licenseNumberList);
  res.json(violationInfo);
}

async function violationInfoHaveRead(req, res) {
  const { id } = req.body;
  await updateViolationInfoToHaveReadById(id);
  res.json({
    isOk: true,
    message: '设置已读成功',
    data: { id },
  });
}

exports.violationInfoReporting = violationInfoReporting;
exports.getAllViolationInfo = getAllViolationInfo;
exports.approveViolationInfo = approveViolationInfo;
exports.getViolationInfoByLicenseNumberList = getViolationInfoByLicenseNumberList;
exports.violationInfoHaveRead = violationInfoHaveRead;
