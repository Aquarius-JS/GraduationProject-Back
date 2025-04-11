const { selectVehicelRegisterInfoByLicense } = require('../model/vehicleRegistrationInfo');

/**
 * 根据车牌号获取车辆登记信息
 * @param {*} req
 * @param {*} res
 */
async function getVehicleRegisterInfoByLicense(req, res) {
  const { license_number } = req.body;
  const registerInfo = await selectVehicelRegisterInfoByLicense(license_number);
  res.json({
    isOk: true,
    message: '操作成功',
    data: registerInfo,
  });
}

exports.getVehicleRegisterInfoByLicense = getVehicleRegisterInfoByLicense;
