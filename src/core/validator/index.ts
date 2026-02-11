export type ValidationDetail = { row: number; column: string; type: 'critical' | 'warning'; message: string };
export type ValidationReport = { total: number; critical: number; warnings: number; details: ValidationDetail[] };

export async function validateBuffer(): Promise<ValidationReport> {
  // TODO: Validaciones de formato, integridad y negocio (RF2)
  return { total: 0, critical: 0, warnings: 0, details: [] };
}
