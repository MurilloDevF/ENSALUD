// Global type definitions for Electron IPC API

interface ElectronAPI {
  ping: () => Promise<string>;
  getAppVersion: () => Promise<string>;
  importFile: (filePath: string) => Promise<import('./index').ImportResult>;
  validateData: (data: unknown) => Promise<import('./index').ValidationResult>;
  calculate: (data: unknown) => Promise<import('./index').CalculationResult>;
  generateReport: (params: unknown) => Promise<import('./index').ReportResult>;
}

declare global {
  interface Window {
    api: ElectronAPI;
  }
}

export {};
