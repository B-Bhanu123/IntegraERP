import { TaskState, Task } from '../models/project';
import { EntityStatus, UUID } from '../models/types';

export interface WorkflowTransition {
  from: TaskState;
  to: TaskState;
  requiredRole?: string;
  condition?: (task: Task) => boolean;
}

export class WorkflowEngine {
  private allowedTransitions: Map<TaskState, TaskState[]> = new Map();

  constructor() {
    this.initializeDefaultRules();
  }

  private initializeDefaultRules(): void {
    this.allowedTransitions.set(TaskState.BACKLOG, [TaskState.TODO, TaskState.CANCELLED]);
    this.allowedTransitions.set(TaskState.TODO, [TaskState.IN_PROGRESS, TaskState.CANCELLED]);
    this.allowedTransitions.set(TaskState.IN_PROGRESS, [TaskState.IN_REVIEW, TaskState.BLOCKED, TaskState.TODO]);
    this.allowedTransitions.set(TaskState.IN_REVIEW, [TaskState.DONE, TaskState.IN_PROGRESS, TaskState.BLOCKED]);
    this.allowedTransitions.set(TaskState.BLOCKED, [TaskState.IN_PROGRESS, TaskState.TODO]);
    this.allowedTransitions.set(TaskState.DONE, [TaskState.IN_REVIEW]);
    this.allowedTransitions.set(TaskState.CANCELLED, [TaskState.BACKLOG]);
  }

  public canTransition(currentState: TaskState, targetState: TaskState): boolean {
    const validTargets = this.allowedTransitions.get(currentState);
    if (!validTargets) {
      return false;
    }
    return validTargets.includes(targetState);
  }

  public transitionTask(task: Task, targetState: TaskState, userId: UUID): Task {
    if (!this.canTransition(task.state, targetState)) {
      throw new Error(`Invalid workflow transition from ${task.state} to ${targetState} for Task ${task.key}`);
    }

    const updatedTask: Task = {
      ...task,
      state: targetState,
      updatedAt: new Date().toISOString(),
      updatedBy: userId,
      completedAt: targetState === TaskState.DONE ? new Date().toISOString() : task.completedAt,
    };

    return updatedTask;
  }

  public getAvailableTransitions(currentState: TaskState): TaskState[] {
    return this.allowedTransitions.get(currentState) || [];
  }
}
