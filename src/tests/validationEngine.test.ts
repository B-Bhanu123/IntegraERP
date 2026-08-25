import { describe, it, expect } from 'vitest';
import { SchemaValidationEngine } from '../core/schema/validationEngine';
import { TASK_ENTITY_SCHEMA } from '../core/schema/enterpriseSchemas';

describe('SchemaValidationEngine Tests', () => {
  const engine = new SchemaValidationEngine();

  it('should pass validation for valid Task entity', () => {
    const validTask = {
      id: 'task_1',
      key: 'INT-101',
      projectId: 'proj_1',
      title: 'Valid Task Title',
      type: 'FEATURE',
      state: 'TODO',
      priority: 'HIGH',
      estimatedHours: 10,
      loggedHours: 0,
    };

    const result = engine.validate(validTask, TASK_ENTITY_SCHEMA);
    expect(result.isValid).toBe(true);
    expect(result.errors.length).toBe(0);
  });

  it('should fail validation when required field is missing', () => {
    const invalidTask = {
      id: 'task_1',
      // key is missing
      projectId: 'proj_1',
      title: 'Title',
      type: 'FEATURE',
      state: 'TODO',
      priority: 'HIGH',
      estimatedHours: 10,
      loggedHours: 0,
    };

    const result = engine.validate(invalidTask, TASK_ENTITY_SCHEMA);
    expect(result.isValid).toBe(false);
    expect(result.errors.some((e) => e.field === 'key')).toBe(true);
  });

  it('should fail validation when regex pattern is violated', () => {
    const invalidPatternTask = {
      id: 'task_1',
      key: 'invalid_key_format', // Must match ^[A-Z]+-[0-9]+$
      projectId: 'proj_1',
      title: 'Title',
      type: 'FEATURE',
      state: 'TODO',
      priority: 'HIGH',
      estimatedHours: 10,
      loggedHours: 0,
    };

    const result = engine.validate(invalidPatternTask, TASK_ENTITY_SCHEMA);
    expect(result.isValid).toBe(false);
    expect(result.errors.some((e) => e.field === 'key')).toBe(true);
  });
});
