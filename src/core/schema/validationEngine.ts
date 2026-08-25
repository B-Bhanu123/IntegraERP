import { EntitySchema, FieldDefinition } from './enterpriseSchemas';

export interface ValidationError {
  field: string;
  message: string;
  value: unknown;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export class SchemaValidationEngine {
  public validate(entityData: Record<string, unknown>, schema: EntitySchema): ValidationResult {
    const errors: ValidationError[] = [];

    schema.fields.forEach((field) => {
      const val = entityData[field.name];

      // Check required
      if (field.required && (val === undefined || val === null || val === '')) {
        errors.push({
          field: field.name,
          message: `Field '${field.label}' is required.`,
          value: val,
        });
        return;
      }

      if (val === undefined || val === null) {
        return;
      }

      // Check type
      if (field.type === 'string' && typeof val !== 'string') {
        errors.push({ field: field.name, message: `Field '${field.label}' must be a string.`, value: val });
      } else if (field.type === 'number' && typeof val !== 'number') {
        errors.push({ field: field.name, message: `Field '${field.label}' must be a number.`, value: val });
      } else if (field.type === 'boolean' && typeof val !== 'boolean') {
        errors.push({ field: field.name, message: `Field '${field.label}' must be a boolean.`, value: val });
      }

      // String length constraints
      if (typeof val === 'string') {
        if (field.min !== undefined && val.length < field.min) {
          errors.push({ field: field.name, message: `Field '${field.label}' must be at least ${field.min} characters.`, value: val });
        }
        if (field.max !== undefined && val.length > field.max) {
          errors.push({ field: field.name, message: `Field '${field.label}' cannot exceed ${field.max} characters.`, value: val });
        }
        if (field.pattern) {
          const regex = new RegExp(field.pattern);
          if (!regex.test(val)) {
            errors.push({ field: field.name, message: `Field '${field.label}' does not match pattern ${field.pattern}.`, value: val });
          }
        }
      }

      // Numeric range constraints
      if (typeof val === 'number') {
        if (field.min !== undefined && val < field.min) {
          errors.push({ field: field.name, message: `Field '${field.label}' cannot be less than ${field.min}.`, value: val });
        }
        if (field.max !== undefined && val > field.max) {
          errors.push({ field: field.name, message: `Field '${field.label}' cannot be greater than ${field.max}.`, value: val });
        }
      }

      // Enum options constraint
      if (field.type === 'select' && field.options) {
        if (!field.options.includes(String(val))) {
          errors.push({ field: field.name, message: `Field '${field.label}' must be one of: ${field.options.join(', ')}.`, value: val });
        }
      }
    });

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}
