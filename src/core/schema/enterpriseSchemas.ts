/**
 * IntegraERP Enterprise Validation Schemas & Field Catalog
 * Provides static validation dictionaries, enterprise compliance constraints, and data dictionaries.
 */

export interface FieldDefinition {
  name: string;
  label: string;
  type: 'string' | 'number' | 'boolean' | 'date' | 'select' | 'array';
  required: boolean;
  min?: number;
  max?: number;
  pattern?: string;
  options?: string[];
  description: string;
}

export interface EntitySchema {
  entityName: string;
  tableName: string;
  primaryKey: string;
  fields: FieldDefinition[];
}

export const USER_ENTITY_SCHEMA: EntitySchema = {
  entityName: 'User',
  tableName: 'sys_users',
  primaryKey: 'id',
  fields: [
    { name: 'id', label: 'User Identifier', type: 'string', required: true, description: 'Unique UUID primary key' },
    { name: 'username', label: 'Username', type: 'string', required: true, min: 3, max: 50, description: 'Unique login credential' },
    { name: 'email', label: 'Email Address', type: 'string', required: true, pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$', description: 'Primary email address' },
    { name: 'role', label: 'User Role', type: 'select', required: true, options: ['SUPER_ADMIN', 'ADMIN', 'EXECUTIVE', 'PROJECT_MANAGER', 'FINANCE_MANAGER', 'INVENTORY_MANAGER', 'HR_MANAGER', 'SALES_MANAGER', 'CONTRIBUTOR', 'AUDITOR', 'GUEST'], description: 'RBAC Role Assignment' },
    { name: 'isActive', label: 'Active Flag', type: 'boolean', required: true, description: 'Whether user account is active' },
    { name: 'createdAt', label: 'Created Timestamp', type: 'date', required: true, description: 'ISO 8601 creation timestamp' },
    { name: 'updatedAt', label: 'Updated Timestamp', type: 'date', required: true, description: 'ISO 8601 last update timestamp' },
  ],
};

export const TASK_ENTITY_SCHEMA: EntitySchema = {
  entityName: 'Task',
  tableName: 'pm_tasks',
  primaryKey: 'id',
  fields: [
    { name: 'id', label: 'Task Identifier', type: 'string', required: true, description: 'Unique UUID primary key' },
    { name: 'key', label: 'Task Key', type: 'string', required: true, pattern: '^[A-Z]+-[0-9]+$', description: 'Human readable task code (e.g. INT-101)' },
    { name: 'projectId', label: 'Project Identifier', type: 'string', required: true, description: 'Foreign key referencing pm_projects' },
    { name: 'title', label: 'Task Title', type: 'string', required: true, min: 5, max: 200, description: 'Short summary of the task' },
    { name: 'description', label: 'Detailed Description', type: 'string', required: false, max: 4000, description: 'Full description of task scope and acceptance criteria' },
    { name: 'type', label: 'Task Type', type: 'select', required: true, options: ['FEATURE', 'BUG', 'CHORE', 'MILESTONE', 'EPIC', 'DOCUMENTATION'], description: 'Category of work item' },
    { name: 'state', label: 'Workflow State', type: 'select', required: true, options: ['BACKLOG', 'TODO', 'IN_PROGRESS', 'IN_REVIEW', 'BLOCKED', 'DONE', 'CANCELLED'], description: 'Current FSM state' },
    { name: 'priority', label: 'Priority Level', type: 'select', required: true, options: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL', 'EMERGENCY'], description: 'Urgency rating' },
    { name: 'estimatedHours', label: 'Estimated Hours', type: 'number', required: true, min: 0, max: 1000, description: 'Planned work hours' },
    { name: 'loggedHours', label: 'Logged Hours', type: 'number', required: true, min: 0, max: 2000, description: 'Actual recorded work hours' },
  ],
};

export const INVOICE_ENTITY_SCHEMA: EntitySchema = {
  entityName: 'Invoice',
  tableName: 'fin_invoices',
  primaryKey: 'id',
  fields: [
    { name: 'id', label: 'Invoice Identifier', type: 'string', required: true, description: 'Unique UUID primary key' },
    { name: 'invoiceNumber', label: 'Invoice Number', type: 'string', required: true, pattern: '^INV-[0-9]{6}$', description: 'Formatted invoice reference' },
    { name: 'customerId', label: 'Customer Identifier', type: 'string', required: true, description: 'Foreign key to crm_customers' },
    { name: 'issueDate', label: 'Issue Date', type: 'date', required: true, description: 'Date invoice was issued' },
    { name: 'dueDate', label: 'Due Date', type: 'date', required: true, description: 'Payment due date' },
    { name: 'subtotal', label: 'Subtotal Amount', type: 'number', required: true, min: 0, description: 'Pre-tax line total sum' },
    { name: 'taxTotal', label: 'Tax Total Amount', type: 'number', required: true, min: 0, description: 'Calculated tax total' },
    { name: 'grandTotal', label: 'Grand Total Amount', type: 'number', required: true, min: 0, description: 'Total payable amount' },
    { name: 'currency', label: 'Currency Code', type: 'select', required: true, options: ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'INR', 'CHF'], description: 'ISO 4217 Currency' },
  ],
};
