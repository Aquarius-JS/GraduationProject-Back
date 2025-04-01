const saveFile = require('../service/saveFile');
/**
 * 静态资源上传接口
 * @param {*} req
 * @param {*} res
 */
async function uploadFile(req, res) {
  const fileName = await saveFile(req);
  res.json(JSON.stringify({ fileName, url: `http://localhost:3000/upload/${fileName}` }));
}

exports.uploadFile = uploadFile;
