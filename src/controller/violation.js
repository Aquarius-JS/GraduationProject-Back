const curUnixDate = require('../service/share/curUnixDate');
const { createViolationInfo, selectViolationInfo } = require('../model/violation');

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
  await createViolationInfo(
    id,
    license_number,
    JSON.stringify(violation_title),
    violation_content,
    detection_location,
    JSON.stringify(imgList),
    reporting_time,
    reporting_source,
    status
  );
  res.send({
    isOk: true,
    message: '违规信息上报成功',
  });
}

/**
 *
 */
async function getAllViolationInfo(req, res) {
  const violationInfo = await selectViolationInfo();
  res.send({
    isOk: true,
    message: '违规信息获取成功',
    data: violationInfo,
  });
}

exports.violationInfoReporting = violationInfoReporting;
exports.getAllViolationInfo = getAllViolationInfo;
