// Modules to control application life and create native browser window
const {
  app,
  BrowserWindow,
  ipcMain,
  Menu
} = require('electron');
const { createUid } = require('./src/service/uid');

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
}];


// 事件队列
app.eventArr = [];
// 所有窗口对象
app.windowMap = [];
// 关于窗口
app.aboutWindow = null;

function init() {
  const menu = Menu.buildFromTemplate(menuTemp);
  Menu.setApplicationMenu(menu);

  openNewWindow();
}

function openNewWindow() {
  const window = new BrowserWindow({
    width: 1000,
    height: 600
  }); // // 创建一个窗口
  const id = createUid(); // uid
  window.loadFile('./entry/main/index.html');
  window.on('closed', () => {
    delete app.windowMap[id];
  });

  // 记录窗口
  const win = {
    window,
    state: {
      isFinishRender: false,
      isUsed: false
    }
  }

  app.windowMap[id] = win;
  console.log(app.windowMap);
}

function openAbout() {
  const aboutWindow = new BrowserWindow({
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
  app.aboutWindow = aboutWindow;
}

app.on('ready', init);

app.on('before-quit', e => {
  console.log(12312123);
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})


ipcMain.on('renderer_ipc', (event, payload) => {
  console.log('收到了渲染进程的通信内容');
  console.log(payload);
  const win = event.sender;
  let curWindow;
  Object.keys(app.windowMap).map(key => {
    const cur = app.windowMap[key];
    if (cur.window.webContents === win) {
      curWindow = app.windowMap[key];
    }
  });
  if (curWindow) { // 找到了窗口
    curWindow.state.isFinishRender = true;
  }
  console.log('---');
  console.log(app.windowMap);
})

// -------------------


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



// 用于直接通过dock启动的打开文件
app.on('open-file', function (e, path) {
  app.selfTest = path;
  app.eventArr.push({
    type: 'OPEN_FILE',
    payload: path
  });
});


// app.on('activate', function () {
//   if (!app.windowList.length) {
//     openNewWindow();
//     openNewWindow();
//   }
// });