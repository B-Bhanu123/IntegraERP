import { BaseEntity, UUID, ISODateString, PriorityLevel, EntityStatus, Money } from './types';

export enum TaskType {
  FEATURE = 'FEATURE',
  BUG = 'BUG',
  CHORE = 'CHORE',
  MILESTONE = 'MILESTONE',
  EPIC = 'EPIC',
  DOCUMENTATION = 'DOCUMENTATION',
}

export enum TaskState {
  BACKLOG = 'BACKLOG',
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  IN_REVIEW = 'IN_REVIEW',
  BLOCKED = 'BLOCKED',
  DONE = 'DONE',
  CANCELLED = 'CANCELLED',
}

export interface TaskDependency {
  id: UUID;
  taskId: UUID;
  dependsOnTaskId: UUID;
  type: 'finish_to_start' | 'start_to_start' | 'finish_to_finish' | 'start_to_finish';
  lagDays?: number;
}

export interface SubTask {
  id: UUID;
  title: string;
  isCompleted: boolean;
  assignedTo?: UUID;
  estimatedHours?: number;
}

export interface Task extends BaseEntity {
  key: string; // e.g. "INT-101"
  projectId: UUID;
  title: string;
  description: string;
  type: TaskType;
  state: TaskState;
  priority: PriorityLevel;
  assigneeId?: UUID;
  reporterId: UUID;
  estimatedHours: number;
  loggedHours: number;
  startDate?: ISODateString;
  dueDate?: ISODateString;
  completedAt?: ISODateString;
  tags: string[];
  subtasks: SubTask[];
  dependencies: TaskDependency[];
  customFields?: Record<string, unknown>;
}

export interface ProjectMilestone extends BaseEntity {
  projectId: UUID;
  name: string;
  description: string;
  dueDate: ISODateString;
  isReached: boolean;
  reachedAt?: ISODateString;
}

export interface ProjectBudget {
  allocated: Money;
  spent: Money;
  forecast: Money;
  variancePercentage: number;
}

export interface ProjectPhase extends BaseEntity {
  projectId: UUID;
  name: string;
  order: number;
  startDate: ISODateString;
  endDate: ISODateString;
  status: EntityStatus;
}

export interface Project extends BaseEntity {
  code: string;
  name: string;
  description: string;
  status: EntityStatus;
  priority: PriorityLevel;
  managerId: UUID;
  teamMemberIds: UUID[];
  startDate: ISODateString;
  targetEndDate: ISODateString;
  actualEndDate?: ISODateString;
  budget: ProjectBudget;
  phases: ProjectPhase[];
  milestones: ProjectMilestone[];
  tags: string[];
}

export interface TimeEntry extends BaseEntity {
  taskId: UUID;
  userId: UUID;
  hours: number;
  date: ISODateString;
  description: string;
  billable: boolean;
  hourlyRate?: number;
}
