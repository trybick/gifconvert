import { app, BrowserWindow, Menu, Tray } from 'electron';
import * as path from 'path';
import * as isDev from 'electron-is-dev';
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
import appIcon from './helpers/appIcon';

let mainWindow: BrowserWindow;
let tray: Tray | null = null;
let shouldQuit = false;
const shouldOpenDevTools = false;
const port = 4002;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 560,
    height: 560,
    resizable: false,
    center: true,
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
    shouldOpenDevTools && mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadURL(`file://${__dirname}/../index.html`);
  }

  installExtension(REACT_DEVELOPER_TOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err));

  mainWindow.on('restore', () => {
    app.dock.show();
  });
  mainWindow.on('close', (event: Event) => {
    mainWindow.hide();
    app.dock.hide();
    !shouldQuit && event.preventDefault();
  });
}

function createTray() {
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show Gif Convert',
      click: async () => {
        mainWindow.show();
      },
    },
    { type: 'separator' },
    {
      label: 'Quit Gif Convert',
      click: async () => {
        app.quit();
      },
    },
  ]);

  tray = new Tray(appIcon);
  tray.setToolTip('Gif Convert');
  tray.setIgnoreDoubleClickEvents(true);

  tray.on('click', () => {
    mainWindow.show();
    app.dock.show();
  });
  tray.on('right-click', () => {
    tray?.popUpContextMenu(contextMenu);
  });
}

app.on('ready', () => {
  createMainWindow();
  createTray();
});

app.on('activate', () => {
  mainWindow.show();
});

app.on('before-quit', () => {
  shouldQuit = true;
});
