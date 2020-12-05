import { BrowserWindow } from 'electron';
import * as path from 'path';
import * as isDev from 'electron-is-dev';
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';

export function createWindow(
  mainWindow: BrowserWindow | null,
  { devToolsOnStartup }: { devToolsOnStartup: boolean }
) {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 1000,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
    },
  });

  if (isDev) {
    mainWindow.loadURL('http://localhost:4002/index.html');

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

  mainWindow.on('closed', () => (mainWindow = null));
}
