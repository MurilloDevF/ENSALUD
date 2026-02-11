// Electron main process

import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import * as path from 'path';
import type {
  AuthCredentials,
  AuthResult,
  ImportResult,
  ValidationReport,
  CalculationSummary,
  ReportExportResult
} from '../types';

// Import core modules
import { uploadNormalizedFile, transformToInternalModel } from '../core/importer';
import { validateBuffer } from '../core/validator';
import { runBudgetCalculations } from '../core/calculator';
import { exportReport } from '../core/reporter';
import { initDb } from '../db';

let mainWindow: BrowserWindow | null = null;
const isDev = process.env.NODE_ENV === 'development';

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false
    }
  });

  // Load the app
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

// App lifecycle
app.whenReady().then(async () => {
  // Initialize database
  try {
    await initDb();
    console.log('Database initialized');
  } catch (error) {
    console.error('Failed to initialize database:', error);
  }

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

// Authentication handlers
ipcMain.handle('auth:login', async (_event, credentials: AuthCredentials): Promise<AuthResult> => {
  try {
    // TODO: Implement actual authentication
    console.log('Login attempt:', credentials.username);
    
    // Placeholder authentication
    if (credentials.username && credentials.password) {
      return {
        success: true,
        message: 'Login successful',
        user: {
          id: '1',
          username: credentials.username,
          role: 'admin'
        }
      };
    } else {
      return {
        success: false,
        message: 'Invalid credentials'
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Login failed'
    };
  }
});

ipcMain.handle('auth:logout', async (): Promise<void> => {
  console.log('User logged out');
  // TODO: Clear session, cleanup
});

// File operation handlers
ipcMain.handle('file:upload', async (_event, filePath: string): Promise<ImportResult> => {
  try {
    console.log('Uploading file:', filePath);
    return await uploadNormalizedFile(filePath);
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Upload failed',
      errors: [error instanceof Error ? error.message : 'Unknown error']
    };
  }
});

ipcMain.handle('data:validate', async (): Promise<ValidationReport> => {
  try {
    console.log('Validating data');
    return await validateBuffer();
  } catch (error) {
    return {
      valid: false,
      totalRecords: 0,
      validRecords: 0,
      invalidRecords: 0,
      details: [],
      summary: error instanceof Error ? error.message : 'Validation failed'
    };
  }
});

ipcMain.handle('data:transform', async (): Promise<ImportResult> => {
  try {
    console.log('Transforming data');
    return await transformToInternalModel();
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Transform failed',
      errors: [error instanceof Error ? error.message : 'Unknown error']
    };
  }
});

// Calculation handlers
ipcMain.handle('calc:run', async (): Promise<CalculationSummary> => {
  try {
    console.log('Running calculations');
    return await runBudgetCalculations();
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Calculation failed');
  }
});

// Report handlers
ipcMain.handle('report:export', async (_event, params: { type: string; filters: any; filePath: string }): Promise<ReportExportResult> => {
  try {
    console.log('Exporting report:', params.type);
    return await exportReport(params.type, params.filters, params.filePath);
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Export failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
});

// Dialog handlers
ipcMain.handle('dialog:selectFile', async (): Promise<string | null> => {
  try {
    const result = await dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [
        { name: 'Excel Files', extensions: ['xlsx', 'xls'] },
        { name: 'CSV Files', extensions: ['csv'] },
        { name: 'All Files', extensions: ['*'] }
      ]
    });

    if (!result.canceled && result.filePaths.length > 0) {
      return result.filePaths[0];
    }
    return null;
  } catch (error) {
    console.error('File selection failed:', error);
    return null;
  }
});
