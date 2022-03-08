const fs = require('fs');
const path = require('path');

exports.deleteFile = (filePath, relativePath) => {
  filePath = path.join(__dirname, filePath);
  fs.unlink(filePath, (err) => console.error(err));
}
