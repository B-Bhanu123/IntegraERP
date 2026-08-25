import { User, UserRole } from '../core/models/user';
import { Project, Task, TaskState, TaskType } from '../core/models/project';
import { LedgerAccount, AccountType } from '../core/models/finance';
import { Product, Warehouse, StockItem, ProductCategory } from '../core/models/inventory';
import { Employee, EmploymentType } from '../core/models/hr';
import { Customer, Lead, LeadStatus } from '../core/models/crm';
import { PriorityLevel, EntityStatus } from '../core/models/types';

export function generateSeedUsers(): User[] {
  const roles: UserRole[] = [
    UserRole.SUPER_ADMIN,
    UserRole.ADMIN,
    UserRole.PROJECT_MANAGER,
    UserRole.FINANCE_MANAGER,
    UserRole.INVENTORY_MANAGER,
    UserRole.HR_MANAGER,
    UserRole.SALES_MANAGER,
    UserRole.CONTRIBUTOR,
    UserRole.AUDITOR,
  ];

  return Array.from({ length: 50 }).map((_, index) => ({
    id: `user_${index + 1}`,
    username: `user_${index + 1}`,
    email: `employee_${index + 1}@integraerp.internal`,
    role: roles[index % roles.length],
    profile: {
      firstName: `First_${index + 1}`,
      lastName: `Last_${index + 1}`,
      jobTitle: `Specialist ${index + 1}`,
      timeZone: 'UTC',
      locale: 'en-US',
    },
    security: {
      twoFactorEnabled: index % 2 === 0,
      sessionTimeoutMinutes: 30,
      passwordLastChanged: new Date().toISOString(),
    },
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));
}

export function generateSeedProjects(): Project[] {
  return Array.from({ length: 15 }).map((_, index) => ({
    id: `proj_${index + 1}`,
    code: `PRJ-2026-${(index + 1).toString().padStart(3, '0')}`,
    name: `Enterprise Initiative ${index + 1}`,
    description: `Comprehensive organizational project covering phase ${index + 1} deliverables and milestones.`,
    status: index % 3 === 0 ? EntityStatus.COMPLETED : EntityStatus.IN_PROGRESS,
    priority: index % 2 === 0 ? PriorityLevel.HIGH : PriorityLevel.MEDIUM,
    managerId: `user_${(index % 5) + 1}`,
    teamMemberIds: [`user_1`, `user_2`, `user_3`, `user_4`],
    startDate: '2026-01-01T00:00:00.000Z',
    targetEndDate: '2026-12-31T23:59:59.000Z',
    budget: {
      allocated: { amount: 150000 + index * 25000, currency: 'USD' },
      spent: { amount: 80000 + index * 10000, currency: 'USD' },
      forecast: { amount: 145000 + index * 20000, currency: 'USD' },
      variancePercentage: -3.3,
    },
    phases: [
      {
        id: `phase_${index + 1}_1`,
        projectId: `proj_${index + 1}`,
        name: 'Planning & Discovery',
        order: 1,
        startDate: '2026-01-01T00:00:00.000Z',
        endDate: '2026-03-31T00:00:00.000Z',
        status: EntityStatus.COMPLETED,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    milestones: [
      {
        id: `ms_${index + 1}_1`,
        projectId: `proj_${index + 1}`,
        name: 'Alpha Architecture Freeze',
        description: 'Finalize technical specification and module breakdown.',
        dueDate: '2026-04-15T00:00:00.000Z',
        isReached: true,
        reachedAt: '2026-04-14T00:00:00.000Z',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    tags: ['CoreERP', 'Transformation', 'Infrastructure'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));
}

export function generateSeedTasks(): Task[] {
  const states = [TaskState.TODO, TaskState.IN_PROGRESS, TaskState.IN_REVIEW, TaskState.DONE];
  const types = [TaskType.FEATURE, TaskType.BUG, TaskType.CHORE, TaskType.DOCUMENTATION];

  return Array.from({ length: 100 }).map((_, index) => ({
    id: `task_${index + 1}`,
    key: `INT-${100 + index}`,
    projectId: `proj_${(index % 15) + 1}`,
    title: `Implement Task Module Component ${index + 1}`,
    description: `Detailed technical implementation for module component ${index + 1} including validation rules and test coverage.`,
    type: types[index % types.length],
    state: states[index % states.length],
    priority: index % 4 === 0 ? PriorityLevel.CRITICAL : PriorityLevel.MEDIUM,
    assigneeId: `user_${(index % 10) + 1}`,
    reporterId: 'user_1',
    estimatedHours: 16 + (index % 5) * 8,
    loggedHours: 12 + (index % 5) * 6,
    tags: ['Frontend', 'Backend', 'Database'],
    subtasks: [
      { id: `sub_${index}_1`, title: 'Design Interfaces', isCompleted: true, estimatedHours: 4 },
      { id: `sub_${index}_2`, title: 'Write Unit Tests', isCompleted: index % 2 === 0, estimatedHours: 4 },
    ],
    dependencies: index > 0 && index % 3 === 0 ? [{ id: `dep_${index}`, taskId: `task_${index + 1}`, dependsOnTaskId: `task_${index}`, type: 'finish_to_start' }] : [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));
}

export function generateSeedAccounts(): LedgerAccount[] {
  return [
    { id: 'acc_1', accountCode: '1010', name: 'Operating Cash Account', type: AccountType.ASSET, currency: 'USD', balance: 1250000.0, isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 'acc_2', accountCode: '1100', name: 'Accounts Receivable', type: AccountType.ASSET, currency: 'USD', balance: 340000.0, isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 'acc_3', accountCode: '1200', name: 'Inventory Asset Account', type: AccountType.ASSET, currency: 'USD', balance: 480000.0, isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 'acc_4', accountCode: '2010', name: 'Accounts Payable', type: AccountType.LIABILITY, currency: 'USD', balance: 210000.0, isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 'acc_5', accountCode: '3010', name: 'Common Stock Equity', type: AccountType.EQUITY, currency: 'USD', balance: 1000000.0, isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 'acc_6', accountCode: '4010', name: 'Enterprise Software Sales Revenue', type: AccountType.REVENUE, currency: 'USD', balance: 1500000.0, isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 'acc_7', accountCode: '5010', name: 'Payroll & Compensation Expense', type: AccountType.EXPENSE, currency: 'USD', balance: 640000.0, isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  ];
}
