import { Task, TaskDependency } from '../models/project';
import { UUID } from '../models/types';

export interface TopologicalSortResult {
  sortedTaskIds: UUID[];
  hasCycle: boolean;
  cycleNodeIds?: UUID[];
}

export class DependencyResolver {
  /**
   * Sort tasks topologically based on their finish-to-start dependencies.
   * Uses Kahn's algorithm for topological sorting and cycle detection.
   */
  public sortTasksTopologically(tasks: Task[]): TopologicalSortResult {
    const taskMap = new Map<UUID, Task>();
    const inDegree = new Map<UUID, number>();
    const adjacencyList = new Map<UUID, UUID[]>();

    // Initialize data structures
    tasks.forEach((task) => {
      taskMap.set(task.id, task);
      inDegree.set(task.id, 0);
      adjacencyList.set(task.id, []);
    });

    // Build graph
    tasks.forEach((task) => {
      if (task.dependencies && task.dependencies.length > 0) {
        task.dependencies.forEach((dep: TaskDependency) => {
          // dep.dependsOnTaskId must be completed BEFORE dep.taskId
          const parentId = dep.dependsOnTaskId;
          const childId = dep.taskId;

          if (taskMap.has(parentId) && taskMap.has(childId)) {
            const children = adjacencyList.get(parentId) || [];
            children.push(childId);
            adjacencyList.set(parentId, children);

            const currentInDegree = inDegree.get(childId) || 0;
            inDegree.set(childId, currentInDegree + 1);
          }
        });
      }
    });

    // Queue for nodes with in-degree 0 (no dependencies)
    const queue: UUID[] = [];
    inDegree.forEach((degree, taskId) => {
      if (degree === 0) {
        queue.push(taskId);
      }
    });

    const sortedTaskIds: UUID[] = [];

    while (queue.length > 0) {
      const currentId = queue.shift()!;
      sortedTaskIds.push(currentId);

      const neighbors = adjacencyList.get(currentId) || [];
      neighbors.forEach((neighborId) => {
        const updatedDegree = (inDegree.get(neighborId) || 0) - 1;
        inDegree.set(neighborId, updatedDegree);
        if (updatedDegree === 0) {
          queue.push(neighborId);
        }
      });
    }

    const hasCycle = sortedTaskIds.length !== tasks.length;
    const cycleNodeIds = hasCycle
      ? Array.from(inDegree.entries())
          .filter(([_, degree]) => degree > 0)
          .map(([id]) => id)
      : undefined;

    return {
      sortedTaskIds,
      hasCycle,
      cycleNodeIds,
    };
  }

  /**
   * Calculates the Critical Path (CPM) duration in estimated hours.
   */
  public calculateCriticalPathDuration(tasks: Task[]): number {
    const { sortedTaskIds, hasCycle } = this.sortTasksTopologically(tasks);
    if (hasCycle) {
      throw new Error('Cannot calculate critical path duration for tasks containing cyclic dependencies.');
    }

    const taskMap = new Map<UUID, Task>();
    tasks.forEach((t) => taskMap.set(t.id, t));

    const earliestCompletionTime = new Map<UUID, number>();

    sortedTaskIds.forEach((taskId) => {
      const task = taskMap.get(taskId);
      if (!task) return;

      let maxPredecessorCompletion = 0;
      if (task.dependencies) {
        task.dependencies.forEach((dep) => {
          const predTime = earliestCompletionTime.get(dep.dependsOnTaskId) || 0;
          if (predTime > maxPredecessorCompletion) {
            maxPredecessorCompletion = predTime;
          }
        });
      }

      const finishTime = maxPredecessorCompletion + (task.estimatedHours || 0);
      earliestCompletionTime.set(taskId, finishTime);
    });

    let maxDuration = 0;
    earliestCompletionTime.forEach((time) => {
      if (time > maxDuration) {
        maxDuration = time;
      }
    });

    return maxDuration;
  }
}
