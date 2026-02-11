export interface ImportResult { filePath: string; rows: number }
export interface ValidationDetail { row: number; column: string; type: 'critical' | 'warning'; message: string }
export interface ValidationReport { total: number; critical: number; warnings: number; details: ValidationDetail[] }
export interface CalculationSummary { processed: number; durationMs: number }
export interface ReportExportResult { success: boolean; filePath?: string }
