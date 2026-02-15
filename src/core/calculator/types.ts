/**
 * Core calculator module types
 * Defines interfaces for accumulator calculation and query execution
 */

import type { FilterParams, Accumulator, AccumulatorResult } from '../../types';

/**
 * Interface for accumulator service operations
 * This will be implemented by the core accumulator service
 */
export interface IAccumulatorService {
  /**
   * Create a new accumulator
   * @param name - User-friendly name for the accumulator
   * @param sedeIds - Array of Sede IDs to include
   * @param cecoIds - Array of Centro de Costos IDs to include
   * @returns Promise resolving to the created Accumulator
   */
  createAccumulator(
    name: string,
    sedeIds: string[],
    cecoIds: string[]
  ): Promise<Accumulator>;

  /**
   * Get an accumulator by ID
   * @param id - Accumulator ID
   * @returns Promise resolving to the Accumulator or null if not found
   */
  getAccumulator(id: string): Promise<Accumulator | null>;

  /**
   * List all accumulators
   * @returns Promise resolving to array of all Accumulators
   */
  listAccumulators(): Promise<Accumulator[]>;

  /**
   * Delete an accumulator
   * @param id - Accumulator ID to delete
   * @returns Promise resolving to boolean indicating success
   */
  deleteAccumulator(id: string): Promise<boolean>;

  /**
   * Execute accumulator queries and return aggregated results
   * @param accumulatorId - ID of the accumulator to execute
   * @param period - Optional period filter
   * @param empresaIds - Optional empresa IDs to filter by
   * @returns Promise resolving to AccumulatorResult
   */
  executeAccumulator(
    accumulatorId: string,
    period?: string | { from: string; to: string },
    empresaIds?: string[]
  ): Promise<AccumulatorResult>;
}

/**
 * Interface for data query operations
 * This will be implemented by the core query service
 */
export interface IQueryService {
  /**
   * Execute a query with the given filter parameters
   * Queries are executed with both sedeIds and cecoIds together
   * @param filters - Filter parameters including sedeIds and cecoIds
   * @returns Promise resolving to aggregated query results
   */
  queryData(filters: FilterParams): Promise<Record<string, number>>;

  /**
   * Execute multiple queries and aggregate results
   * Useful for executing accumulator queries with multiple Sede/CeCo combinations
   * @param filterSets - Array of filter parameter sets to execute
   * @returns Promise resolving to aggregated results from all queries
   */
  queryMultiple(filterSets: FilterParams[]): Promise<Record<string, number>>;
}

/**
 * Configuration for accumulator calculation
 */
export interface AccumulatorCalculationConfig {
  /** Whether to merge overlapping results */
  mergeOverlapping?: boolean;
  /** Aggregation strategy for combining results */
  aggregationStrategy?: 'sum' | 'average' | 'min' | 'max';
  /** Whether to include metadata in results */
  includeMetadata?: boolean;
}

/**
 * Result of a single query operation
 * Internal type used during accumulator execution
 */
export interface QueryResult {
  /** Sede IDs used in the query */
  sedeIds: string[];
  /** CeCo IDs used in the query */
  cecoIds: string[];
  /** Result data */
  data: Record<string, number>;
  /** Timestamp of query execution */
  executedAt: string;
}
