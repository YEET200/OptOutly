const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("suppressionApi", {
  listProviders: () => ipcRenderer.invoke("providers:list"),
  startRunner: (payload) => ipcRenderer.invoke("runner:start", payload),
  stopRunner: () => ipcRenderer.invoke("runner:stop"),
  exportJson: (data) => ipcRenderer.invoke("export:json", data),
  onLog: (callback) => {
    const listener = (_event, line) => callback(line);
    ipcRenderer.on("runner:log", listener);
    return () => ipcRenderer.removeListener("runner:log", listener);
  }
});
