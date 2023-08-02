const { app, BrowserWindow } = require('electron')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false, // Important for security reasons
      contextIsolation: true // Important for security reasons
    }
  })

  win.loadURL('http://paultreanor.com')
}

app.whenReady().then(createWindow)
