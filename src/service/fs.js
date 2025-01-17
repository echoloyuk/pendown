const fs = require('fs');
const { dialog } = require('electron').remote;

function saveFile (filePath, content, title) {
  if (!content) {
    content = '';
  }
  // 如果是新增，需要弹出一个新的窗口来保存
  if (!filePath) {
    filePath = dialog.showSaveDialog({
      defaultPath: title,
      nameFieldLabel: '文件名',
      filters: [
        {name: 'markdown', extensions: ['md', 'markdown']}
      ]
    });
  }
  return new Promise((resolve, reject) => {
    if (!filePath) {
      reject();
      return;
    }
    fs.writeFile(filePath, content, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve({
        filePath
      });
    })
  });
}

function readFile(filePath) {
  return new Promise((resolve, reject) => {
    if (!filePath) {
      filePath = dialog.showOpenDialog({
        properties: [
          'openFile'
        ],
        filters: [
          {name: 'markdown', extensions: ['md', 'markdown']}
        ]
      }); 
      // filePath will return ['/path/to/string'];
      if (filePath && filePath.length) {
        filePath = filePath[0];
      } else {
        reject();
      }
    }
    if (!filePath) {
      reject('不合法的文件路径');
    }
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve({
        filePath,
        data
      });
    })
  });
}

module.exports = {
  saveFile,
  readFile
}