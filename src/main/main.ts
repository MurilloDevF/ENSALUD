import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import path from 'node:path';

// Core modules (stubs wired up)
import * as importer from '../core/importer';
import * as validator from '../core/validator';
import * as calculator from '../core/calculator';
import * as reporter from '../core/reporter';

const isDev = process.env.NODE_ENV !== 'production';

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (isDev) {
    // Renderer served by Vite in dev
    win.loadURL('http://localhost:5173');
  } else {
    // Renderer built static HTML in prod
    win.loadFile(path.join(__dirname, '../renderer/index.html'));
  }
}

// IPC Handlers
ipcMain.handle('auth:login', async (_event, { username, password }: { username: string; password: string }) => {
  const ok = Boolean(username) && Boolean(password) && username.length >= 3;
  return { success: ok };
});

ipcMain.handle('file:upload', async (_event, filePath: string) => {
  const res = await importer.uploadNormalizedFile(filePath);
  return { success: Boolean(res), detail: res };
});

ipcMain.handle('data:validate', async () => {
  const report = await validator.validateBuffer();
  return { success: true, report };
});

ipcMain.handle('data:transform', async () => {
  const ok = await importer.transformToInternalModel();
  return { success: Boolean(ok) };
});

ipcMain.handle('calc:run', async () => {
  const summary = await calculator.runBudgetCalculations();
  return { success: true, summary };
});

ipcMain.handle('report:export', async (_event, { type, filters }: { type: string; filters: Record<string, unknown> }) => {
  const { filePath } = await dialog.showSaveDialog({
    title: 'Guardar reporte',
    defaultPath: `Reporte_${type}_${new Date().toISOString().slice(0, 10)}.xlsx`,
    filters: [{ name: 'Excel', extensions: ['xlsx'] }],
  });
  if (!filePath) return { success: false };

  const res = await reporter.exportReport(type, filters, filePath);
  return { success: res.success, filePath };
});

app.whenReady().then(createWindow);
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
