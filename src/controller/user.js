const jwt = require('jsonwebtoken');
const privateKey = require('../config/privateKey');
const { getUserInfoByStuNumber } = require('../model/userInfo');

async function login(req, res) {
  const { stuNumber, password } = req.body;
  const info = await getUserInfoByStuNumber(stuNumber);
  const stuInfo = info[0];
  if (stuInfo && stuInfo.password === password) {
    const token = jwt.sign({ stuNumber }, privateKey);
    res.cookie('token', token, { httpOnly: false });
    res.json({ isOk: true });
  } else {
    res.json({ isOk: false });
  }
}

exports.login = login;
