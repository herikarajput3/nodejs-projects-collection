const fs = require('fs');
const path = require('path');

function safeUnlink(relativePath) {
  if (!relativePath) return;
  const absPath = path.join(__dirname, '../../', relativePath);
  fs.stat(absPath, (err, stats) => {
    if (!err && stats.isFile()) {
      fs.unlink(absPath, () => {});
    }
  });
}

module.exports = { safeUnlink };
