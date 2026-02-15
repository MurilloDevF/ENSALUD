/**
 * IPC (Inter-Process Communication) contract types
 * Defines the contract between renderer and main processes for accumulator operations
 */

import type { FilterParams, Accumulator, AccumulatorResult } from '../../types';

/**
 * Request to create a new accumulator
 */
export interface CreateAccumulatorRequest {
  /** Name for the new accumulator */
  name: string;
  /** Sede IDs to include */
  sedeIds: string[];
  /** Centro de Costos IDs to include */
  cecoIds: string[];
}

/**
 * Response when creating an accumulator
 */
export interface CreateAccumulatorResponse {
  /** Whether the operation succeeded */
  success: boolean;
  /** The created accumulator, if successful */
  accumulator?: Accumulator;
  /** Error message, if unsuccessful */
  error?: string;
}

/**
 * Request to query data using filter parameters
 */
export interface QueryDataRequest {
  /** Filter parameters for the query */
  filters: FilterParams;
}

/**
 * Response containing query results
 */
export interface QueryDataResponse {
  /** Whether the query succeeded */
  success: boolean;
  /** Query results as key-value pairs */
  data?: Record<string, number>;
  /** Error message, if unsuccessful */
  error?: string;
}

/**
 * Request to execute accumulator queries
 */
export interface ExecuteAccumulatorRequest {
  /** ID of the accumulator to execute */
  accumulatorId: string;
  /** Optional period filter */
  period?: string | { from: string; to: string };
  /** Optional empresa IDs to filter by */
  empresaIds?: string[];
}

/**
 * Response containing accumulator execution results
 */
export interface ExecuteAccumulatorResponse {
  /** Whether the execution succeeded */
  success: boolean;
  /** Accumulator result, if successful */
  result?: AccumulatorResult;
  /** Error message, if unsuccessful */
  error?: string;
}

/**
 * Request to list all accumulators
 */
export interface ListAccumulatorsRequest {
  // No parameters needed for listing all
}

/**
 * Response containing list of accumulators
 */
export interface ListAccumulatorsResponse {
  /** Whether the operation succeeded */
  success: boolean;
  /** List of accumulators, if successful */
  accumulators?: Accumulator[];
  /** Error message, if unsuccessful */
  error?: string;
}

/**
 * IPC channel names for accumulator operations
 */
export const IPC_CHANNELS = {
  /** Create a new accumulator */
  CREATE_ACCUMULATOR: 'accumulator:create',
  /** Execute an accumulator query */
  EXECUTE_ACCUMULATOR: 'accumulator:execute',
  /** List all accumulators */
  LIST_ACCUMULATORS: 'accumulator:list',
  /** Delete an accumulator */
  DELETE_ACCUMULATOR: 'accumulator:delete',
  /** Query data with filters */
  QUERY_DATA: 'data:query',
} as const;
