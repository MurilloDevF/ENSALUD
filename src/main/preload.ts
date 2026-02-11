// Electron preload script - exposes safe API to renderer process

import { contextBridge, ipcRenderer } from 'electron';
import type { 
  AuthCredentials, 
  AuthResult, 
  ImportResult, 
  ValidationReport, 
  CalculationSummary, 
  ReportExportResult 
} from '../types';

// Expose protected methods that allow the renderer process to use
// ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('api', {
  // Authentication
  login: (credentials: AuthCredentials): Promise<AuthResult> => 
    ipcRenderer.invoke('auth:login', credentials),
  
  logout: (): Promise<void> => 
    ipcRenderer.invoke('auth:logout'),
  
  // File operations
  uploadFile: (filePath: string): Promise<ImportResult> => 
    ipcRenderer.invoke('file:upload', filePath),
  
  validateData: (): Promise<ValidationReport> => 
    ipcRenderer.invoke('data:validate'),
  
  transformData: (): Promise<ImportResult> => 
    ipcRenderer.invoke('data:transform'),
  
  // Calculations
  runCalculations: (): Promise<CalculationSummary> => 
    ipcRenderer.invoke('calc:run'),
  
  // Reports
  exportReport: (type: string, filters: any, filePath: string): Promise<ReportExportResult> => 
    ipcRenderer.invoke('report:export', { type, filters, filePath }),
  
  // Utility
  selectFile: (): Promise<string | null> => 
    ipcRenderer.invoke('dialog:selectFile')
});
