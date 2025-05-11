const { selectViolationInfoById } = require('../model/violation');
const { selectVehicelRegisterInfoByLicense } = require('../model/vehicleRegistrationInfo');
const { getUserInfoByStuNumber } = require('../model/userInfo');
const { violationInfoEmail } = require('./sendEmail');

const violationInfoNotice = async violationInfoId => {
  const violationInfo = await selectViolationInfoById(violationInfoId);
  if (violationInfo.status !== 1) return;
  const vehicleInfo = await selectVehicelRegisterInfoByLicense(violationInfo.license_number);
  const vehicleRes = vehicleInfo.find(item => item.status !== 0);
  if (vehicleInfo == null) return;
  const stuInfo = await getUserInfoByStuNumber(vehicleRes.stu_number);
  if (stuInfo == null) return;
  violationInfoEmail(stuInfo, violationInfo);
};

exports.violationInfoNotice = violationInfoNotice;
