const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const myCors = require('./middleware/cors');
const { isLoginMiddleware } = require('./middleware/user');
const {
  login,
  getUserInfo,
  getStudentAndVehicleInfo,
  uploadStuAvatar,
  updateStuInfo,
  editPassword,
  vehicleRegistration,
} = require('./controller/user');
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
app.get('/getUserInfo', getUserInfo);

app.post('/vehicleRegistration', vehicleRegistration);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
