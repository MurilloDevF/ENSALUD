import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
  uploadNormalizedFile: (filePath: string) => ipcRenderer.invoke('file:upload', filePath),
  validateBuffer: () => ipcRenderer.invoke('data:validate'),
  transformData: () => ipcRenderer.invoke('data:transform'),
  runBudgetCalculations: () => ipcRenderer.invoke('calc:run'),
  exportReport: (type: string, filters: Record<string, unknown>) => ipcRenderer.invoke('report:export', { type, filters }),
  login: (username: string, password: string) => ipcRenderer.invoke('auth:login', { username, password }),
});
