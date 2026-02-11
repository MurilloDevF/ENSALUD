export {};

declare global {
  interface Window {
    api: {
      uploadNormalizedFile: (filePath: string) => Promise<{ success: boolean; detail?: any }>;
      validateBuffer: () => Promise<{ success: boolean; report: import('./index').ValidationReport }>;
      transformData: () => Promise<{ success: boolean }>;
      runBudgetCalculations: () => Promise<{ success: boolean; summary: import('./index').CalculationSummary }>;
      exportReport: (type: string, filters: Record<string, unknown>) => Promise<{ success: boolean; filePath?: string }>;
      login: (username: string, password: string) => Promise<{ success: boolean }>;
    };
  }
}
