"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld('electron', {
    onOff: (event, key) => electron_1.ipcRenderer.invoke('on-off', key),
    homePath: () => electron_1.ipcRenderer.invoke('home-path'),
});
//# sourceMappingURL=preload.js.map