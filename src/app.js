const express = require('express');
const cookieParser = require('cookie-parser');
const myCors = require('./middleware/cors');
const { isLoginMiddleware } = require('./middleware/user');
const { login, getUserInfo, getStudentAndVehicleInfo } = require('./controller/user');
const { port } = require('./config/appConfig');
const app = express();

app.use(myCors); // for CORS
app.use(express.json()); // for parsing application/json
app.use(cookieParser()); // for parsing cookies
app.use(isLoginMiddleware); // for checking login status

app.post('/login', login);
app.post('/getStudentAndVehicleInfo', getStudentAndVehicleInfo);
app.get('/getUserInfo', getUserInfo);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
