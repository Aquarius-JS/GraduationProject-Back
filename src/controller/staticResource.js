const saveFile = require('../service/saveFile');
const { port } = require('../config/appConfig');

/**
 * 静态资源上传接口
 * @param {*} req
 * @param {*} res
 */
async function uploadFile(req, res) {
  const host = process.env.HOST || 'localhost';
  const fileName = await saveFile(req);
  res.json({ fileName, url: `http://${host}:${port}/upload/${fileName}` });
}

exports.uploadFile = uploadFile;
