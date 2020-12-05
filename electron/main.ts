import { app, BrowserWindow } from 'electron';
import { createWindow } from './helpers/startup';

let mainWindow: BrowserWindow | null = null;

function init() {
  createWindow(mainWindow, { devToolsOnStartup: false });
}

app.on('ready', () => {
  init();
});

app.on('activate', () => {
  if (mainWindow === null) {
    init();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
