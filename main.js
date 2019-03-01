// Modules to control application life and create native browser window
const {
  app,
  BrowserWindow,
  ipcMain,
  Menu
} = require('electron');

const pkg = require('./package.json');

const menuTemp = [{
  label: 'Pendown',
  submenu: [{
    label: '关闭',
    accelerator: 'CmdOrCtrl+Q',
    role: 'quit'
  }]
}, {
  label: '编辑',
  submenu: [{
    label: '复制',
    accelerator: 'CmdOrCtrl+C',
    role: 'copy'
  }, {
    label: '粘贴',
    accelerator: 'CmdOrCtrl+V',
    role: 'paste'
  }]
}, {
  label: '帮助',
  submenu: [{
    label: 'About',
    role: 'click',
    click: () => {
      openAbout();
    }
  }]
}]

let mainWindow;
let aboutWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 600
  });
  mainWindow.loadFile('./entry/main/index.html');
  mainWindow.on('closed', () => {
    mainWindow = null
  });

  const menu = Menu.buildFromTemplate(menuTemp);
  Menu.setApplicationMenu(menu);
}

function openAbout() {
  aboutWindow = new BrowserWindow({
    width: 500,
    height: 360,
    minimizable: false,
    maximizable: false,
    center: true,
    resizable: false
  });
  aboutWindow.loadFile('./entry/about/index.html');
  aboutWindow.show();
  aboutWindow.on('closed', () => {
    aboutWindow = null;
  });
}

// 主进程监听渲染进程什么时候真正ready了
ipcMain.on('RENDERER_FINISH', (e, p) => {
  console.log(p);
  app.eventArr = app.eventArr.filter((item, index) => {
    if (item.type === 'OPEN_FILE') {
      e.sender.send('OPEN_FILE', item.payload);
      return false;
    } else {
      return true;
    }
  });
});

// 事件队列
app.eventArr = [];

// 用于直接通过dock启动的打开文件
app.on('open-file', function (e, path) {
  app.selfTest = path;
  app.eventArr.push({
    type: 'OPEN_FILE',
    payload: path
  });
});

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
});