/**
 * Filter parameters for querying data by Sede and Centro de Costos (CeCo)
 * Both sedeIds and cecoIds are used together in database queries
 */
export interface FilterParams {
  /** Array of Sede IDs to filter by */
  sedeIds: string[];
  /** Array of Centro de Costos IDs to filter by */
  cecoIds: string[];
  /** Optional period filter - either a single period string or a date range */
  period?: string | { from: string; to: string };
  /** Optional array of Empresa IDs to filter by */
  empresaIds?: string[];
}

/**
 * Accumulator definition
 * An accumulator is a named collection of Sedes and CeCos that can be used
 * to aggregate results from multiple queries. Multiple accumulators can exist
 * with overlapping Sedes or CeCos.
 */
export interface Accumulator {
  /** Unique identifier for the accumulator */
  id: string;
  /** User-friendly name for the accumulator */
  name: string;
  /** Array of Sede IDs included in this accumulator */
  sedeIds: string[];
  /** Array of Centro de Costos IDs included in this accumulator */
  cecoIds: string[];
  /** ISO 8601 timestamp when the accumulator was created */
  createdAt: string;
}

/**
 * Result data for an accumulator
 * Contains the aggregated results from queries using the accumulator's
 * Sede and CeCo combinations
 */
export interface AccumulatorResult {
  /** ID of the accumulator this result belongs to */
  accumulatorId: string;
  /** Name of the accumulator (for convenience) */
  name: string;
  /** 
   * Aggregated totals, stored as key-value pairs
   * Keys represent metric names, values are the aggregated amounts
   */
  totals: Record<string, number>;
  /** Optional metadata about the query execution */
  metadata?: {
    /** Number of individual queries executed */
    queryCount?: number;
    /** Timestamp when the result was generated */
    generatedAt?: string;
    /** Period covered by the results */
    period?: string | { from: string; to: string };
  };
}
