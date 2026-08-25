import { describe, it, expect } from 'vitest';
import { WorkflowEngine } from '../core/engine/workflowEngine';
import { TaskState, Task, TaskType } from '../core/models/project';
import { PriorityLevel } from '../core/models/types';

describe('WorkflowEngine Tests', () => {
  const engine = new WorkflowEngine();

  const mockTask: Task = {
    id: 'task_1',
    key: 'INT-101',
    projectId: 'proj_1',
    title: 'Test Task',
    description: 'Unit test task',
    type: TaskType.FEATURE,
    state: TaskState.TODO,
    priority: PriorityLevel.HIGH,
    reporterId: 'user_1',
    estimatedHours: 10,
    loggedHours: 0,
    tags: [],
    subtasks: [],
    dependencies: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  it('should allow valid transition from TODO to IN_PROGRESS', () => {
    expect(engine.canTransition(TaskState.TODO, TaskState.IN_PROGRESS)).toBe(true);
  });

  it('should reject invalid direct transition from TODO to DONE', () => {
    expect(engine.canTransition(TaskState.TODO, TaskState.DONE)).toBe(false);
  });

  it('should transition task state cleanly and update completion timestamp when completed', () => {
    const updated = engine.transitionTask(
      { ...mockTask, state: TaskState.IN_REVIEW },
      TaskState.DONE,
      'user_1'
    );
    expect(updated.state).toBe(TaskState.DONE);
    expect(updated.completedAt).toBeDefined();
  });
});
