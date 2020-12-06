import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as isDev from 'electron-is-dev';
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';

let mainWindow: BrowserWindow;
let shouldQuit = false;
const devToolsOnStartup = false;
const port = 4002;

function init() {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 825,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
    },
  });

  if (isDev) {
    mainWindow.loadURL(`http://localhost:${port}/index.html`);
    require('electron-reload')(__dirname, {
      electron: path.join(__dirname, '..', '..', 'node_modules', '.bin', 'electron'),
      forceHardReset: true,
      hardResetMethod: 'exit',
    });
    devToolsOnStartup && mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadURL(`file://${__dirname}/../index.html`);
  }

  installExtension(REACT_DEVELOPER_TOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err));

  mainWindow.on('close', (e: Event) => {
    mainWindow.hide();
    !shouldQuit && e.preventDefault();
  });
}

app.on('ready', () => {
  init();
});

app.on('activate', () => {
  mainWindow.show();
});

app.on('before-quit', () => {
  shouldQuit = true;
});
