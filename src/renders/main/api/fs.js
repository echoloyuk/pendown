const fs = require('fs');
const { remote } = require('electron');

export function getCurrentFiles () {
  let str = '';
  fs.readdirSync(remote.app.getAppPath()).forEach(file => {
    str += file + '\r\n';
  });
  return str;
}