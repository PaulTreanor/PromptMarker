import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'node:path'
import Store from 'electron-store'
import defaultPrompts from './default-prompts'

process.env.DIST = path.join(__dirname, '../dist')
process.env.PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public')

// Initialise electron-store in renderer process
const store = new Store();

// if store is empty, set default values from default-prompts.ts
if (store.size === 0 ) {
  store.set('prompts', defaultPrompts)
}
console.log({"defaultPrompts": defaultPrompts})

if (store.get('prompts').length === 0) {
  store.set('prompts', defaultPrompts)
}


console.log({"prompts": store.get('prompts')})

let win: BrowserWindow | null
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      webviewTag: true,
      nodeIntegration: true,
      contextIsolation: true,
      // enableWebView: true // from chatgpt
    },
    width: 1000,
		height: 800,
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(process.env.DIST, 'index.html'))
  }
}

app.on('window-all-closed', () => {
  win = null
})

app.whenReady().then(createWindow)

ipcMain.handle("store/read", async (event, args) => {
  const data = store.get('prompts')
  console.log("Reading from store")
  console.log({data})
  return data
})

ipcMain.handle("store/write", async (event, args) => {
  store.set('prompts', args)
  return "writing to store"
})