import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels = 'ipc-example';

contextBridge.exposeInMainWorld('electron', {
  onOff: (event: typeof event, key: string) =>
    ipcRenderer.invoke('on-off', key),
  homePath: () => ipcRenderer.invoke('home-path'),
});
