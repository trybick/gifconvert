import { app, BrowserWindow, Menu, nativeImage, Tray } from 'electron';
import * as path from 'path';
import * as isDev from 'electron-is-dev';
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';

let mainWindow: BrowserWindow;
let tray: Tray | null = null;
let shouldQuit = false;
const shouldOpenDevTools = false;
const port = 4002;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 560,
    height: 560,
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
      label: 'Show TrayGif',
      click: async () => {
        mainWindow.show();
      },
    },
    { type: 'separator' },
    {
      label: 'Quit TrayGif',
      click: async () => {
        app.quit();
      },
    },
  ]);

  const iconPath = path.join(__dirname, '/images/tray-icon.png');
  const ogTrayIcon = nativeImage.createFromPath(iconPath);
  const resizedTrayIcon = ogTrayIcon.resize({ width: 16, height: 16 });

  tray = new Tray(resizedTrayIcon);
  tray.setToolTip('TrayGif');
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
