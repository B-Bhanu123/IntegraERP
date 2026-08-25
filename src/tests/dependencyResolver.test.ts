import { describe, it, expect } from 'vitest';
import { DependencyResolver } from '../core/engine/dependencyResolver';
import { Task, TaskState, TaskType } from '../core/models/project';
import { PriorityLevel } from '../core/models/types';

describe('DependencyResolver Tests', () => {
  const resolver = new DependencyResolver();

  const taskA: Task = {
    id: 'task_A',
    key: 'INT-A',
    projectId: 'proj_1',
    title: 'Task A',
    description: '',
    type: TaskType.FEATURE,
    state: TaskState.TODO,
    priority: PriorityLevel.MEDIUM,
    reporterId: 'user_1',
    estimatedHours: 8,
    loggedHours: 0,
    tags: [],
    subtasks: [],
    dependencies: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const taskB: Task = {
    ...taskA,
    id: 'task_B',
    key: 'INT-B',
    title: 'Task B',
    estimatedHours: 16,
    dependencies: [{ id: 'dep_1', taskId: 'task_B', dependsOnTaskId: 'task_A', type: 'finish_to_start' }],
  };

  it('should correctly sort tasks topologically without cycles', () => {
    const result = resolver.sortTasksTopologically([taskB, taskA]);
    expect(result.hasCycle).toBe(false);
    expect(result.sortedTaskIds).toEqual(['task_A', 'task_B']);
  });

  it('should detect cyclic dependencies correctly', () => {
    const cyclicA: Task = {
      ...taskA,
      dependencies: [{ id: 'dep_2', taskId: 'task_A', dependsOnTaskId: 'task_B', type: 'finish_to_start' }],
    };
    const result = resolver.sortTasksTopologically([cyclicA, taskB]);
    expect(result.hasCycle).toBe(true);
  });

  it('should calculate correct Critical Path duration', () => {
    const duration = resolver.calculateCriticalPathDuration([taskA, taskB]);
    expect(duration).toBe(24); // 8h + 16h
  });
});
