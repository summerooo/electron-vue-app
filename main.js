const { app, BrowserWindow, ipcMain, Notification } = require('electron/main')

const path = require('path');
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // 启用相关的 Web 环境配置
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
    },
  })
  if (app.isPackaged) {
    // 生产环境
    win.loadFile('dist/index.html')
    win.webContents.openDevTools()

  } else {
    // 开发环境
    win.loadURL('http://localhost:5173')
    win.webContents.openDevTools()
  }
}

app.whenReady().then(() => {
  createWindow()
})
const NOTIFICATION_TITLE = 'Basic Notification'
const NOTIFICATION_BODY = 'Notification from the Main process'

function showNotification () {
  new Notification({ title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY }).show()
}

// 使用 ipcMain.on() 监听来自于渲染进程的消息
ipcMain.on('message-from-renderer', (event, arg) => {
  console.log('Main process received message:', arg);
  // 发送回应给渲染进程
  event.reply('response-from-main', `Main process says: ${arg}`);
});

// 使用 ipcMain.handle() 处理来自于渲染进程的请求
ipcMain.handle('request-from-renderer', async (event, arg) => {
  console.log('Main process received request:', arg);
  // 执行一些异步操作，比如文件读写等
  // 这里简单模拟一个异步操作
  await new Promise(resolve => setTimeout(resolve, 1000));
  showNotification()
  return `Main process processed: ${arg}`;
});