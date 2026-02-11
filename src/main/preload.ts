import { contextBridge, ipcRenderer } from 'electron';

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('api', {
  // Ping test
  ping: () => ipcRenderer.invoke('ping'),
  
  // App information
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  
  // File operations
  importFile: (filePath: string) => ipcRenderer.invoke('import-file', filePath),
  
  // Data validation
  validateData: (data: unknown) => ipcRenderer.invoke('validate-data', data),
  
  // Calculations
  calculate: (data: unknown) => ipcRenderer.invoke('calculate', data),
  
  // Report generation
  generateReport: (params: unknown) => ipcRenderer.invoke('generate-report', params),
});
