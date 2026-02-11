// Shared utility functions for ENSALUD Presupuestal

/**
 * Safely converts a value to a number, returning 0 if conversion fails
 */
export function toNumberSafe(value: any): number {
  if (value === null || value === undefined || value === '') {
    return 0;
  }
  
  const num = Number(value);
  return isNaN(num) ? 0 : num;
}

/**
 * Rounds a number using banker's rounding (round half to even)
 * This is also known as statistical rounding or round-to-even
 */
export function roundBank(value: number, decimals: number = 2): number {
  const multiplier = Math.pow(10, decimals);
  const shifted = value * multiplier;
  const floor = Math.floor(shifted);
  const remainder = shifted - floor;
  
  // If exactly at .5, round to even
  if (Math.abs(remainder - 0.5) < Number.EPSILON) {
    return (floor % 2 === 0 ? floor : floor + 1) / multiplier;
  }
  
  // Otherwise, use standard rounding
  return Math.round(shifted) / multiplier;
}

/**
 * Formats a number as currency in PEN (Peruvian Soles)
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
}

/**
 * Validates if a string is a valid date in format YYYY-MM-DD
 */
export function isValidDate(dateString: string): boolean {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) {
    return false;
  }
  
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime());
}
