// Data validator

import type { ValidationResult, ValidationRule } from '../types/index.js';

/**
 * Validate data against a set of rules
 * @param data - Data to validate
 * @param rules - Validation rules to apply
 * @returns Validation result with errors if any
 */
export async function validateData(
  data: unknown,
  rules: ValidationRule[] = []
): Promise<ValidationResult> {
  const errors: string[] = [];

  try {
    console.log('Validating data with', rules.length, 'rules');
    
    // TODO: Implement actual validation logic
    // For now, return a simple validation result
    
    if (!data) {
      errors.push('Data is required');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  } catch (error) {
    errors.push(`Validation error: ${error instanceof Error ? error.message : String(error)}`);
    return {
      valid: false,
      errors,
    };
  }
}

/**
 * Validate required fields
 */
export function validateRequiredFields(data: Record<string, unknown>, fields: string[]): string[] {
  const errors: string[] = [];
  
  for (const field of fields) {
    if (!data[field]) {
      errors.push(`Field '${field}' is required`);
    }
  }
  
  return errors;
}
