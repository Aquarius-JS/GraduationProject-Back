const {
  getUserInfoByStuNumber,
  getVehicleRegistrationInfo,
  getVehicleRegistrationInfoById,
  updateVehicleRegistrationInfoById,
} = require('../model/userInfo');
const { approveRegisterEmail } = require('../service/sendEmail');

/**
 * 获取车辆登记信息列表
 */
async function getRegisterInfo(req, res) {
  const registerInfo = await getVehicleRegistrationInfo();
  registerInfo.sort((a, b) => a.filing_date - b.filing_date);
  res.json(registerInfo);
}

/**
 * 车辆登记申请审批通过
 * @param {*} req
 * @param {*} res
 */
async function approveRegister(req, res) {
  const { registerId, remark } = req.body;
  const registerInfo = await getVehicleRegistrationInfoById(registerId);
  const stuInfo = await getUserInfoByStuNumber(registerInfo.stu_number);
  if (registerInfo?.vehicle_status === 1) {
    await updateVehicleRegistrationInfoById(registerId, 2, remark);
    res.json({ isOk: true, message: '操作成功', vehicle_status: 2 });
    approveRegisterEmail(stuInfo, registerInfo);
  } else {
    res.json({ isOk: false, message: '申请信息发生变化，稍后重试' });
  }
}

/**
 * 车辆登记申请审批拒绝
 * @param {*} req
 * @param {*} res
 */
async function rejectRegister(req, res) {
  const { registerId, remark } = req.body;
  const registerInfo = await getVehicleRegistrationInfoById(registerId);
  if (registerInfo?.vehicle_status === 1) {
    await updateVehicleRegistrationInfoById(registerId, 5, remark);
    res.json({ isOk: true, message: '操作成功', vehicle_status: 5, remark });
  } else {
    res.json({ isOk: false, message: '申请信息发生变化，稍后重试' });
  }
}

exports.getRegisterInfo = getRegisterInfo;
exports.approveRegister = approveRegister;
exports.rejectRegister = rejectRegister;
