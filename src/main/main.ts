/* eslint-disable no-console */
/* eslint global-require: off, promise/always-return: off */
/* eslint global-require: off, import/extensions: off */
/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, shell, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';

const mqtt = require('mqtt');

const mqttBroker = 'yourMQttBroker';
const clientID = 'yourID';
class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

export interface IpcRequest {
  responseChannel?: string;

  params?: string;
}

// const client = dgram.createSocket('udp4');
const client = mqtt.connect(mqttBroker, {
  clientId: clientID,
  clean: true,
  reconnectPeriod: 1,
});
// eslint-disable-next-line func-names
client.on('connect', function (connack) {
  console.log('client connected', connack);
});

// eslint-disable-next-line func-names
client.on('error', function (err: Error) {
  console.log(`Error: ${err}`);
});

// eslint-disable-next-line func-names
client.on('close', function () {
  console.log('Connection closed by client');
});

// eslint-disable-next-line func-names
client.on('reconnect', function () {
  console.log('Client trying a reconnection');
});

// eslint-disable-next-line func-names
client.on('offline', function () {
  console.log('Client is currently offline');
});

const sendMessage = (msg: string) => {
  if (mainWindow) {
    mainWindow.webContents.send(msg, {
      message: msg,
    });
  }
};
app.on('ipc-message', (event: any, message: any) => {
  sendMessage(message);
});

ipcMain.handle('on-off-sign', (_event: any, key: string, value: string) => {
  switch (key) {
    case 'SIGN':
      client.publish(
        'on-air',
        value,
        { qos: 1, retain: false },
        (_PacketCallback: any, err: Error) => {
          if (err) {
            console.log(err, 'MQTT publish packet');
          }
        },
      );
      break;
    case 'FOUNTAIN':
      client.publish(
        'fountain',
        value,
        { qos: 1, retain: false },
        (_PacketCallback: any, err: Error) => {
          if (err) {
            console.log(err, 'MQTT publish packet');
          }
        },
      );
      break;
    default:
      break;
  }
});
ipcMain.handle('on-off-sign', (_event: Event, key: string, value: string) => {
  // eslint-disable-next-line func-names
  switch (key) {
    case 'SIGN':
      client.publish(
        'on-air',
        value,
        { qos: 1, retain: false },
        (_PacketCallback: any, err: Error) => {
          if (err) {
            console.log(err, 'MQTT publish packet');
          }
        },
      );
      break;
    case 'FOUNTAIN':
      client.publish(
        'fountain',
        value,
        { qos: 1, retain: false },
        (_PacketCallback: any, err: Error) => {
          if (err) {
            console.log(err, 'MQTT publish packet');
          }
        },
      );
      break;
    case 'ORB':
      client.publish(
        'orb',
        value,
        { qos: 1, retain: false },
        (_PacketCallback: any, err: Error) => {
          if (err) {
            console.log(err, 'MQTT publish packet');
          }
        },
      );
      break;
    default:
      break;
  }
  return `on-off-${key}: ${value}`;
});

ipcMain.handle('on-off-fountain', (_event: Event, key: string) => {
  return `on-off-fountain: ${key}`;
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload,
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 580,
    height: 500,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      sandbox: false,
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
