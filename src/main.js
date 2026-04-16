const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const { providers } = require("./providers");
const { runSuppressionFlow } = require("./suppressionRunner");

let mainWindow;
let isRunning = false;
let stopRequested = false;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 840,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  mainWindow.loadFile(path.join(__dirname, "renderer", "index.html"));
}

function sendLog(message) {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send("runner:log", message);
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.handle("providers:list", async () => {
  return providers;
});

ipcMain.handle("runner:stop", async () => {
  stopRequested = true;
  sendLog("Stop requested. Finishing current provider safely...");
  return { ok: true };
});

ipcMain.handle("runner:start", async (_event, payload) => {
  if (isRunning) {
    return { ok: false, error: "A run is already in progress." };
  }

  const selectedIds = payload?.selectedProviderIds ?? [];
  const profile = payload?.profile ?? {};

  if (!selectedIds.length) {
    return { ok: false, error: "Select at least one provider." };
  }

  const selectedProviders = providers.filter((p) => selectedIds.includes(p.id));
  if (!selectedProviders.length) {
    return { ok: false, error: "No valid providers selected." };
  }

  isRunning = true;
  stopRequested = false;

  sendLog(`Starting suppression run for ${selectedProviders.length} providers...`);

  const results = [];
  for (const provider of selectedProviders) {
    if (stopRequested) {
      sendLog("Run stopped by user.");
      break;
    }

    sendLog(`\n=== ${provider.name} ===`);

    try {
      const result = await runSuppressionFlow({
        provider,
        profile,
        onLog: sendLog,
        shouldStop: () => stopRequested
      });
      results.push(result);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      sendLog(`Failed: ${message}`);
      results.push({
        providerId: provider.id,
        providerName: provider.name,
        status: "failed",
        notes: [message]
      });
    }
  }

  isRunning = false;

  const successCount = results.filter((r) => r.status === "completed").length;
  const manualCount = results.filter((r) => r.status === "manual-required").length;
  const failedCount = results.filter((r) => r.status === "failed").length;

  sendLog(
    `\nDone. Completed: ${successCount}, Manual required: ${manualCount}, Failed: ${failedCount}`
  );

  return { ok: true, results };
});

ipcMain.handle("export:json", async (_event, data) => {
  const { canceled, filePath } = await dialog.showSaveDialog({
    title: "Save suppression run results",
    defaultPath: "suppression-results.json",
    filters: [{ name: "JSON", extensions: ["json"] }]
  });

  if (canceled || !filePath) {
    return { ok: false, canceled: true };
  }

  const fs = require("fs/promises");
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
  return { ok: true, filePath };
});
