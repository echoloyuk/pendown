// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain, Menu} = require('electron');
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
  role: 'window',
  submenu: [{
    label: 'About',
    role: 'about'
  }]
}
]

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 1000, height: 600});

  // and load the index.html of the app.
  mainWindow.loadFile('./entry/main/index.html')
  // mainWindow.loadURL('http://127.0.0.1:8080/src/renders/main/');

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  });

  const menu = Menu.buildFromTemplate(menuTemp);
  Menu.setApplicationMenu(menu);
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
app.on('open-file', function(e, path) {
  app.selfTest = path;
  app.eventArr.push({
    type: 'OPEN_FILE',
    payload: path
  });
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
