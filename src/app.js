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
} = require('./controller/announcement');
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

app.post('/login', login);
app.post('/getStudentAndVehicleInfo', getStudentAndVehicleInfo);
app.post('/uploadStuAvatar', upload.array(), uploadStuAvatar);
app.post('/updateStuInfo', updateStuInfo);
app.post('/editPassword', editPassword);
app.post('/getStuInfo', getStuInfo);

app.post('/getVehicleInfoByStu', getVehicleInfoByStu);
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

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
