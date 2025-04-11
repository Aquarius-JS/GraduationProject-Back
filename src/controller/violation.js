const curUnixDate = require('../service/share/curUnixDate');
const { createViolationInfo } = require('../model/violation');
const { selectVehicelRegisterInfoByLicense } = require('../model/vehicleRegistrationInfo');

/**
 * 违规信息上报接口
 * @param {*} req
 * @param {*} res
 */
async function violationInfoReporting(req, res) {
  const violationInfo = req.body;
  const id = curUnixDate();
  const license_number = violationInfo.license_number;
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

/**
 * 未登记车辆检信息上报接口
 * @param {*} req
 * @param {*} res
 */
async function unregisteredVehicleDetection(req, res) {
  const { license_number } = req.body;
  const registerList = await selectVehicelRegisterInfoByLicense(license_number);
  if (registerList.length > 0) {
    return res.send({
      isOk: false,
      message: '该车辆已登记',
    });
  }
  // const id = curUnixDate();
}

exports.violationInfoReporting = violationInfoReporting;
exports.unregisteredVehicleDetection = unregisteredVehicleDetection;
