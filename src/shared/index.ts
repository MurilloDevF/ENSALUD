export function toNumberSafe(value: unknown): number {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') return Number(value.replace(/[$,\s]/g, '').replace(',', '.')) || 0;
  return 0;
}

export function roundBank(value: number, decimals = 2): number {
  // Round half-even (simple approximation for placeholder)
  const factor = 10 ** decimals;
  return Math.round((value + Number.EPSILON) * factor) / factor;
}
