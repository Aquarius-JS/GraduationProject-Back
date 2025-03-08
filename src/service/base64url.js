module.exports = async function saveFile(req) {
  return new Promise((resolve, reject) => {
    const fileBuffer = req.body;
    if (!fileBuffer) {
      return reject(new Error('No file uploaded'));
    }
    const base64Data = fileBuffer.toString('base64');
    const mimeType = req.headers['content-type'];
    const resourceUrl = `data:${mimeType};base64,${base64Data}`;
    resolve(resourceUrl);
  });
};
