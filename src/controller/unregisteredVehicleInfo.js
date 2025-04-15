const curUnixDate = require('../service/share/curUnixDate');
const { selectVehicelRegisterInfoByLicense } = require('../model/vehicleRegistrationInfo');
const { createUnregisteredVehicleInfo } = require('../model/unregisteredVehicleInfo');

/**
 * 未登记车辆信息上报接口
 * @param {*} req
 * @param {*} res
 */
async function unregisteredVehicleInfoReporting(req, res) {
  const { license_number } = req.body;
  const registerList = await selectVehicelRegisterInfoByLicense(license_number);
  if (registerList.length > 0) {
    res.send({
      isOk: false,
      message: '该车辆已登记',
    });
  } else {
    const id = curUnixDate();
    const img_list = req.body.img_list;
    const reporting_time = req.body.reporting_time;
    const reporting_source = req.body.reporting_source;
    await createUnregisteredVehicleInfo(id, license_number, img_list, reporting_time, reporting_source);
    res.send({
      isOk: true,
      message: '未登记车辆信息提交成功',
    });
  }
}

exports.unregisteredVehicleInfoReporting = unregisteredVehicleInfoReporting;
