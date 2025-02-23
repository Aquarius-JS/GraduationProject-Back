const express = require('express');
const cookieParser = require('cookie-parser');
const { login, getUserInfo } = require('./controller/user');
const app = express();
const port = 3000;

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

app.post('/login', login);
app.get('/getUserInfo', getUserInfo);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
