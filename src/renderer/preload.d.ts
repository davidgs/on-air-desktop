/* eslint global-require: off, import/extensions: off */
/* eslint no-unused-vars: off */
import { Channels } from 'main/preload';

declare global {
  interface Window {
    electron: {
      [x: string]: any;
      ipcRenderer: {
        sendMessage(channel: Channels, args: unknown[]): void;
        on(
          channel: string,
          func: (...args: unknown[]) => void,
        ): (() => void) | undefined;
        once(channel: string, func: (...args: unknown[]) => void): void;
      };
    };
  }
}

export {};
