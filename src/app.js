const path = require('path');
const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const myCors = require('./middleware/cors');
const { isLoginMiddleware } = require('./middleware/user');
const {
  login,
  getStuInfo,
  getStudentAndVehicleInfo,
  uploadStuAvatar,
  updateStuInfo,
  editPassword,
  getVehicleInfoByStu,
  vehicleRegistration,
  confirmEnterSchool,
  registerAgain,
  cancelRegister,
  leavingRegister,
  modificationRegisterInfo,
} = require('./controller/user');
const { getRegisterInfo, approveRegister, rejectRegister } = require('./controller/admin');
const {
  getAnnouncementBasicInfo,
  getAnnouncementInfoById,
  addAnnouncementInfo,
  updateAnnouncementContentById,
  updateAnnouncementTitleById,
  publishAnnouncement,
  unpublishAnnouncement,
  deleteAnnouncement,
  updateAttachedFileListInfo,
} = require('./controller/announcement');
const {
  getVehicleRegisterInfoByStuNumber,
  getVehicleRegisterInfoByLicense,
} = require('./controller/vehicleRegistrationInfo');
const {
  violationInfoReporting,
  getAllViolationInfo,
  approveViolationInfo,
  getViolationInfoByLicenseNumberList,
  violationInfoHaveRead,
  violationInfoAppeal,
} = require('./controller/violation');
const {
  unregisteredVehicleInfoReporting,
  getAllUnregisteredVehicleInfo,
  approveUnregisteredVehicleInfo,
} = require('./controller/unregisteredVehicleInfo');
const { uploadFile } = require('./controller/staticResource');
const { imgOcr } = require('./controller/ocr');
const { port, bodyMaxValue } = require('./config/appConfig');
const app = express();
const upload = multer(); // for parsing multipart/form-data

app.use(myCors); // for CORS
app.use(express.json({ limit: bodyMaxValue })); // for parsing application/json
app.use(cookieParser()); // for parsing cookies
app.use(isLoginMiddleware); // for checking login status
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(bodyParser.raw({ type: 'application/*', limit: 1024 * 1024 * 5 }));
app.use(bodyParser.raw({ type: 'image/*', limit: 1024 * 1024 * 5 }));
app.use(bodyParser.raw({ type: 'video/*', limit: 1024 * 1024 * 100 }));

app.use('/upload', express.static(path.join(__dirname, 'upload')));

app.post('/login', login);
app.post('/getStudentAndVehicleInfo', getStudentAndVehicleInfo); //token
app.post('/uploadStuAvatar', upload.array(), uploadStuAvatar);
app.post('/updateStuInfo', updateStuInfo);
app.post('/editPassword', editPassword);
app.post('/getStuInfo', getStuInfo);

app.post('/getVehicleInfoByStu', getVehicleInfoByStu); // 根据token获取车辆信息
app.post('/getVehicleRegisterInfoByStuNumber', getVehicleRegisterInfoByStuNumber);
app.post('/getVehicleRegisterInfoByLicense', getVehicleRegisterInfoByLicense);
app.post('/vehicleRegistration', vehicleRegistration);

app.post('/admin/getRegisterInfo', getRegisterInfo);
app.post('/admin/approveRegister', approveRegister);
app.post('/admin/rejectRegister', rejectRegister);
app.post('/confirmEnterSchool', confirmEnterSchool);
app.post('/registerAgain', registerAgain);
app.post('/cancelRegister', cancelRegister);
app.post('/leavingRegister', leavingRegister);
app.post('/modificationRegisterInfo', modificationRegisterInfo);

app.post('/getAnnouncementBasicInfo', getAnnouncementBasicInfo);
app.post('/getAnnouncementInfoById', getAnnouncementInfoById);
app.post('/addAnnouncementInfo', addAnnouncementInfo);
app.post('/updateAnnouncementTitleById', updateAnnouncementTitleById);
app.post('/updateAnnouncementContentById', updateAnnouncementContentById);
app.post('/publishAnnouncement', publishAnnouncement);
app.post('/unpublishAnnouncement', unpublishAnnouncement);
app.post('/deleteAnnouncement', deleteAnnouncement);
app.post('/updateAttachedFileListInfo', updateAttachedFileListInfo);

app.post('/uploadFile', upload.array(), uploadFile);

app.post('/imgOcr', upload.array(), imgOcr);

app.post('/unregisteredVehicleInfoReporting', unregisteredVehicleInfoReporting);
app.post('/getAllUnregisteredVehicleInfo', getAllUnregisteredVehicleInfo);
app.post('/approveUnregisteredVehicleInfo', approveUnregisteredVehicleInfo);

app.post('/violationInfoReporting', violationInfoReporting);
app.post('/getAllViolationInfo', getAllViolationInfo);
app.post('/approveViolationInfo', approveViolationInfo);
app.post('/getViolationInfoByLicenseNumberList', getViolationInfoByLicenseNumberList);
app.post('/violationInfoHaveRead', violationInfoHaveRead);
app.post('/violationInfoAppeal', violationInfoAppeal);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
