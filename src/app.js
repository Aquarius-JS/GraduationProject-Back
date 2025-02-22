const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { getUserInfoByStuNumber } = require('./model/userInfo');
const app = express();
const port = 3000;

app.use((req, res, next) => {
  const origin = req.headers.origin;
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('access-control-allow-headers', 'content-type');
  res.setHeader('access-control-allow-methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  next();
}); // for CORS
app.use(express.json()); // for parsing application/json
app.use(cookieParser()); // for parsing cookies

app.post('/login', async (req, res) => {
  //TODO: 抽离到controller
  const { username, password } = req.body;
  const decoded = jwt.verify(req.cookies.token, 'test');
  console.log(decoded, 'decoded');
  const info = await getUserInfoByStuNumber(username);
  if (info[0]) {
    const token = jwt.sign({ stuNumber: info[0].stu_number }, 'test');
    res.cookie('token', token, { httpOnly: false });
    res.json({ isOk: true });
  }
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
