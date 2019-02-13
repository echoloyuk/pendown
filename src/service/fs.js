const fs = require('fs');
const { dialog } = require('electron').remote;

function saveFile (filePath, content) {
  if (!content) {
    content = '';
  }
  // 如果是新增，需要弹出一个新的窗口来保存
  if (!filePath) {
    filePath = dialog.showSaveDialog({
      title: '保存文件',
      message: '保存文件',
      nameFieldLabel: '文件名',
      filters: [
        {name: 'markdown', extensions: ['md', 'markdown']}
      ]
    });
  }
  return new Promise((resolve, reject) => {
    if (!filePath) {
      reject(null);
    }
    fs.writeFile(filePath, content, (err) => {
      if (err) {
        reject(err);
      }
      console.log('save success');
      resolve();
    })
  });
}

module.exports = {
  saveFile
}