import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow: BrowserWindow | null = null;

const isDev = process.env.VITE_DEV_SERVER_URL !== undefined;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    }
  });

  if (isDev) {
    const devServerUrl = process.env.VITE_DEV_SERVER_URL || 'http://localhost:5173';
    mainWindow.loadURL(devServerUrl);
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC Handlers
ipcMain.handle('ping', async () => {
  return 'pong';
});

ipcMain.handle('get-app-version', async () => {
  return app.getVersion();
});

ipcMain.handle('import-file', async (_event, filePath: string) => {
  console.log('Import file:', filePath);
  // TODO: Implement file import logic
  return { success: true, message: 'Import not yet implemented' };
});

ipcMain.handle('validate-data', async (_event, data: unknown) => {
  console.log('Validate data:', data);
  // TODO: Implement validation logic
  return { valid: true, errors: [] };
});

ipcMain.handle('calculate', async (_event, data: unknown) => {
  console.log('Calculate:', data);
  // TODO: Implement calculation logic
  return { success: true, result: null };
});

ipcMain.handle('generate-report', async (_event, params: unknown) => {
  console.log('Generate report:', params);
  // TODO: Implement report generation logic
  return { success: true, reportPath: null };
});
