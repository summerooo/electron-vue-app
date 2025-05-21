const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    // 发送消息到主进程
    sendMessage: (channel, data) => {
        ipcRenderer.send(channel, data);
    },
    // 接收来自主进程的消息
    receiveMessage: (channel, func) => {
        ipcRenderer.on(channel, (event, ...args) => func(...args));
    },
    // 发送同步请求到主进程
    invokeMain: (channel, data) => {
        return ipcRenderer.invoke(channel, data);
    },
});