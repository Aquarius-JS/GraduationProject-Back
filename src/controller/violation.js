const curUnixDate = require('../service/share/curUnixDate');
const { createViolationInfo } = require('../model/violation');

/**
 * 违规信息上报接口
 * @param {*} req
 * @param {*} res
 */
async function violationInfoReporting(req, res) {
  const violationInfo = req.body;
  const id = curUnixDate();
  const license_number = violationInfo.license_number.toUpperCase();
  const title = violationInfo.title;
  const content = violationInfo.content;
  const reporting_time = violationInfo.reporting_time;
  const reporting_source = violationInfo.reporting_source;
  const status = violationInfo.status ?? 0; //默认为0，表示未处理
  await createViolationInfo(id, license_number, title, content, reporting_time, reporting_source, status);
  res.send({
    isOk: true,
    message: '违规信息上报成功',
  });
}

exports.violationInfoReporting = violationInfoReporting;
