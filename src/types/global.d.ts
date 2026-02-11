// Global type declarations for Electron preload API

import type {
  AuthCredentials,
  AuthResult,
  ImportResult,
  ValidationReport,
  CalculationSummary,
  ReportExportResult
} from './index';

declare global {
  interface Window {
    api: {
      // Authentication
      login: (credentials: AuthCredentials) => Promise<AuthResult>;
      logout: () => Promise<void>;
      
      // File operations
      uploadFile: (filePath: string) => Promise<ImportResult>;
      validateData: () => Promise<ValidationReport>;
      transformData: () => Promise<ImportResult>;
      
      // Calculations
      runCalculations: () => Promise<CalculationSummary>;
      
      // Reports
      exportReport: (type: string, filters: any, filePath: string) => Promise<ReportExportResult>;
      
      // Utility
      selectFile: () => Promise<string | null>;
    };
  }
}

export {};
