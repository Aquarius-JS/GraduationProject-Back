const fetch = require('node-fetch');
const { ocrUrl } = require('../config/appConfig');

async function imgOcr(req, res) {
  const buffer = req.body;
  const base64String = buffer.toString('base64');
  const data = {
    base64: base64String,
    options: {
      'data.format': 'text',
    },
  };
  const ocrRes = await fetch(ocrUrl, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  });
  const ocrJson = await ocrRes.json();
  res.json({ isOk: true, message: '识别成功', data: ocrJson });
}

exports.imgOcr = imgOcr;
