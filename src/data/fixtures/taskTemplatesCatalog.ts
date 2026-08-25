/**
 * IntegraERP Standard Operating Procedure (SOP) Task Catalog
 * Pre-defined template tasks for organizational workflows across Engineering, Finance, HR, and Sales.
 */

export interface TaskTemplate {
  code: string;
  category: 'ENGINEERING' | 'FINANCE' | 'HR' | 'SALES' | 'COMPLIANCE';
  title: string;
  description: string;
  estimatedHours: number;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  tags: string[];
}

export const TASK_TEMPLATES_CATALOG: TaskTemplate[] = [
  // Engineering Templates
  { code: 'ENG-SOP-001', category: 'ENGINEERING', title: 'Architecture Review & Threat Modeling', description: 'Conduct formal security threat modeling and system topology audit prior to release.', estimatedHours: 24, priority: 'CRITICAL', tags: ['Architecture', 'Security', 'SOP'] },
  { code: 'ENG-SOP-002', category: 'ENGINEERING', title: 'Database Schema Migration & Index Tuning', description: 'Write idempotent SQL migration scripts and verify query execution plan bottlenecks.', estimatedHours: 16, priority: 'HIGH', tags: ['Database', 'Migration', 'SOP'] },
  { code: 'ENG-SOP-003', category: 'ENGINEERING', title: 'REST & GraphQL API Contract Documentation', description: 'Generate OpenAPI 3.0 specs and client SDK definitions for newly exposed endpoints.', estimatedHours: 12, priority: 'MEDIUM', tags: ['API', 'Documentation', 'SOP'] },
  { code: 'ENG-SOP-004', category: 'ENGINEERING', title: 'End-to-End Automated Regression Test Suite', description: 'Implement Cypress/Playwright integration test cases covering happy path customer flows.', estimatedHours: 40, priority: 'HIGH', tags: ['QA', 'Testing', 'SOP'] },
  { code: 'ENG-SOP-005', category: 'ENGINEERING', title: 'Production Load Testing & Capacity Planning', description: 'Execute k6 load testing scenarios under 10,000 virtual user load to measure latency.', estimatedHours: 20, priority: 'HIGH', tags: ['DevOps', 'Performance', 'SOP'] },

  // Finance Templates
  { code: 'FIN-SOP-001', category: 'FINANCE', title: 'Monthly Financial Closing & Ledger Reconciliation', description: 'Reconcile bank accounts, post accrued expenses, and generate monthly P&L statement.', estimatedHours: 32, priority: 'CRITICAL', tags: ['Finance', 'Closing', 'SOP'] },
  { code: 'FIN-SOP-002', category: 'FINANCE', title: 'Quarterly Corporate Tax Accrual Calculation', description: 'Compute estimated federal and state corporate income tax liabilities under ASC 740.', estimatedHours: 20, priority: 'HIGH', tags: ['Tax', 'Accounting', 'SOP'] },
  { code: 'FIN-SOP-003', category: 'FINANCE', title: 'Enterprise Customer Credit Limit Assessment', description: 'Evaluate financial health of prospective enterprise clients prior to granting Net-60 terms.', estimatedHours: 8, priority: 'MEDIUM', tags: ['Credit', 'Risk', 'SOP'] },
  { code: 'FIN-SOP-004', category: 'FINANCE', title: 'Annual Financial Audit Working Papers Preparation', description: 'Assemble audit schedules, invoice samples, and confirmation letters for external CPA auditors.', estimatedHours: 80, priority: 'CRITICAL', tags: ['Audit', 'Compliance', 'SOP'] },

  // HR Templates
  { code: 'HR-SOP-001', category: 'HR', title: 'New Employee Onboarding & Equipment Provisioning', description: 'Complete I-9 verification, issue developer laptop, assign RBAC permissions, and setup benefits.', estimatedHours: 12, priority: 'HIGH', tags: ['HR', 'Onboarding', 'SOP'] },
  { code: 'HR-SOP-002', category: 'HR', title: 'Bi-Weekly Payroll Processing & Direct Deposit', description: 'Verify timesheet submissions, calculate tax withholdings, and transmit ACH direct deposit files.', estimatedHours: 16, priority: 'CRITICAL', tags: ['Payroll', 'HR', 'SOP'] },
  { code: 'HR-SOP-003', category: 'HR', title: 'Annual Performance Appraisal Review', description: 'Conduct 360-degree performance evaluation reviews and finalize merit salary adjustment scores.', estimatedHours: 40, priority: 'MEDIUM', tags: ['Performance', 'HR', 'SOP'] },

  // Compliance Templates
  { code: 'CMP-SOP-001', category: 'COMPLIANCE', title: 'SOC 2 Type II Controls Audit & Readiness Review', description: 'Inspect audit trail logs, access revocation tickets, and encryption key rotation schedules.', estimatedHours: 60, priority: 'CRITICAL', tags: ['SOC2', 'Security', 'SOP'] },
  { code: 'CMP-SOP-002', category: 'COMPLIANCE', title: 'GDPR / CCPA Data Subject Access Request (DSAR)', description: 'Process customer data erasure request across primary relational databases and backups.', estimatedHours: 14, priority: 'HIGH', tags: ['GDPR', 'Privacy', 'SOP'] },
];
