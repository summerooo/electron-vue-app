const { app, BrowserWindow } = require('electron/main')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // 启用相关的 Web 环境配置
      nodeIntegration: true,
      contextIsolation: false,
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