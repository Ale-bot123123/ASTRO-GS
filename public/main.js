const electron = require('electron');
const { BrowserWindow, ipcMain, screen} = require('electron');
const app = electron.app;
const path = require('path');
const isDev = require('electron-is-dev');
const {SerialPort} = require("serialport");
const {DelimiterParser} = require("@serialport/parser-delimiter")
const {listPorts, openAndClosePort} = require("./serialport")

let mainWindow;

function createWindow() {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize

    mainWindow = new BrowserWindow({
        width,
        height,
        resizable: false,
        fullscreen:true,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            contextIsolation: true,
            worldSafeExecuteJavaScript: true,
        }
    });

    mainWindow.loadURL(isDev ? 'http://127.0.0.1:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
    
    if (isDev) {
        require("electron-reload")(__dirname, {})
    }

    mainWindow.on('closed', () => mainWindow = null);

    listPorts(mainWindow)

    ipcMain.on("openAndClosePort", (channel, port) =>{openAndClosePort(mainWindow,port)})
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});


