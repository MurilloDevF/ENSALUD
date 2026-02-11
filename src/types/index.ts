// Type definitions for ENSALUD Presupuestal

export interface ImportResult {
  success: boolean;
  message: string;
  data?: unknown;
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export interface CalculationResult {
  success: boolean;
  result: unknown;
}

export interface ReportResult {
  success: boolean;
  reportPath: string | null;
}

export interface FileImportOptions {
  filePath: string;
  sheetName?: string;
}

export interface ValidationRule {
  field: string;
  rule: string;
  message: string;
}

export interface CalculationParams {
  type: string;
  data: unknown;
}

export interface ReportParams {
  type: string;
  format: 'csv' | 'excel' | 'pdf';
  data: unknown;
}
