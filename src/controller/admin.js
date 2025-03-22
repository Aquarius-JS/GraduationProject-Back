const {
  getVehicleRegistrationInfo,
  getVehicleRegistrationInfoById,
  updateVehicleRegistrationInfoById,
} = require('../model/userInfo');

/**
 * 获取车辆登记信息列表
 */
async function getRegisterInfo(req, res) {
  const registerInfo = await getVehicleRegistrationInfo();
  registerInfo.sort((a, b) => a.filing_date - b.filing_date);
  res.json(registerInfo);
}

async function approveRegister(req, res) {
  const { registerId } = req.body;
  const registerInfo = await getVehicleRegistrationInfoById(registerId);
  if (registerInfo?.vehicle_status === 1) {
    await updateVehicleRegistrationInfoById(registerId, 2);
    res.json({ isOk: true, message: '操作成功', vehicle_status: 2 });
  } else {
    res.json({ isOk: false, message: '申请信息发生变化，稍后重试' });
  }
}

exports.getRegisterInfo = getRegisterInfo;
exports.approveRegister = approveRegister;
