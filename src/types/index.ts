// Shared type definitions for ENSALUD Presupuestal

export interface ImportResult {
  success: boolean;
  message: string;
  recordCount?: number;
  errors?: string[];
}

export interface ValidationDetail {
  row: number;
  column: string;
  value: any;
  issue: string;
  severity: 'error' | 'warning' | 'info';
}

export interface ValidationReport {
  valid: boolean;
  totalRecords: number;
  validRecords: number;
  invalidRecords: number;
  details: ValidationDetail[];
  summary: string;
}

export interface CalculationSummary {
  totalBudget: number;
  allocatedBudget: number;
  remainingBudget: number;
  calculations: {
    [key: string]: number;
  };
  timestamp: string;
}

export interface ReportExportResult {
  success: boolean;
  filePath?: string;
  message: string;
  error?: string;
}

export interface AuthCredentials {
  username: string;
  password: string;
}

export interface AuthResult {
  success: boolean;
  message: string;
  user?: {
    id: string;
    username: string;
    role: string;
  };
}
