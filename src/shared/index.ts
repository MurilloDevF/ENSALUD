export function toNumberSafe(value: unknown): number {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    // Remove currency symbols and spaces, handle decimal separator
    const cleaned = value.replace(/[$\s]/g, '');
    return Number(cleaned) || 0;
  }
  return 0;
}

export function roundBank(value: number, decimals = 2): number {
  // Standard rounding for placeholder
  // TODO: Implement true banker's rounding (round half-even) if required
  const factor = 10 ** decimals;
  return Math.round((value + Number.EPSILON) * factor) / factor;
}
