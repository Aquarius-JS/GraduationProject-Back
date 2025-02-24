const express = require('express');
const cookieParser = require('cookie-parser');
const { isLoginMiddleware } = require('./middleware/user');
const { login, getUserInfo } = require('./controller/user');
const { port } = require('./config/appConfig');
const app = express();

app.use((req, res, next) => {
  const origin = req.headers.origin;
  res.setHeader('Access-Control-Allow-Origin', origin ?? '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('access-control-allow-headers', 'content-type');
  res.setHeader('access-control-allow-methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  next();
}); // for CORS
app.use(express.json()); // for parsing application/json
app.use(cookieParser()); // for parsing cookies
app.use(isLoginMiddleware); // for checking login status

app.post('/login', login);
// app.post('/getStudentAndVehicleInfo', getStudentAndVehicleInfo);
app.get('/getUserInfo', getUserInfo);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
