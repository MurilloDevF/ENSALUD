import Decimal from 'decimal.js';

Decimal.set({ precision: 24, rounding: Decimal.ROUND_HALF_UP });
export { Decimal };
