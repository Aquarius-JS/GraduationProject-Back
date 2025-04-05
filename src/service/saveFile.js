const fs = require('fs');
const curUnixDate = require('./share/curUnixDate');

async function saveFile(req) {
  const buffer = req.body;
  const fileType = req.headers.suffix ?? req.headers['content-type'].split('/')[1];
  const fileName = `${curUnixDate()}.${fileType}`;
  const filePath = `${__dirname}/../upload/${fileName}`;
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, buffer, err => {
      if (err) {
        reject(err);
      }
      resolve(fileName);
    });
  });
}

module.exports = saveFile;
