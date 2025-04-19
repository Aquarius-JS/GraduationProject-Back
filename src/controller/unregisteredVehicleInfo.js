const curUnixDate = require('../service/share/curUnixDate');
const { selectVehicelRegisterInfoByLicense } = require('../model/vehicleRegistrationInfo');
const { createUnregisteredVehicleInfo, selectUnregisteredVehicleInfo } = require('../model/unregisteredVehicleInfo');

/**
 * 未登记车辆信息上报接口
 * @param {*} req
 * @param {*} res
 */
async function unregisteredVehicleInfoReporting(req, res) {
  const { licenseNumber, detectionLocation, imgList, reportingSource } = req.body;
  const registerList = await selectVehicelRegisterInfoByLicense(licenseNumber);
  if (registerList.length > 0) {
    res.send({
      isOk: false,
      message: '该车辆存在登记信息',
    });
  } else {
    const id = curUnixDate();
    const reporting_time = curUnixDate();
    await createUnregisteredVehicleInfo(
      id,
      licenseNumber,
      detectionLocation,
      JSON.stringify(imgList),
      reporting_time,
      reportingSource
    );
    res.send({
      isOk: true,
      message: '未登记车辆信息提交成功',
    });
  }
}

/**
 * 获取所有未登记车辆信息
 * @param {*} req
 * @param {*} res
 */
async function getAllUnregisteredVehicleInfo(req, res) {
  const unregisteredVehicleInfoList = await selectUnregisteredVehicleInfo();
  res.send({
    isOk: true,
    message: '未登记车辆信息查询成功',
    data: unregisteredVehicleInfoList,
  });
}

exports.unregisteredVehicleInfoReporting = unregisteredVehicleInfoReporting;
exports.getAllUnregisteredVehicleInfo = getAllUnregisteredVehicleInfo;
