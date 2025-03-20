const { getVehicleRegistrationInfo } = require('../model/userInfo');

/**
 * 获取车辆登记信息列表
 */
async function getRegisterInfo(req, res) {
  const registerInfo = await getVehicleRegistrationInfo();
  registerInfo.sort((a, b) => a.filing_date - b.filing_date);
  res.json(registerInfo);
}

exports.getRegisterInfo = getRegisterInfo;
