import { Task, TaskState, TaskType } from '../core/models/project';
import { PriorityLevel, UUID } from '../core/models/types';
import { WorkflowEngine } from '../core/engine/workflowEngine';
import { DependencyResolver } from '../core/engine/dependencyResolver';

export class TaskService {
  private tasks: Map<UUID, Task> = new Map();
  private workflowEngine: WorkflowEngine;
  private dependencyResolver: DependencyResolver;

  constructor(initialTasks: Task[] = []) {
    this.workflowEngine = new WorkflowEngine();
    this.dependencyResolver = new DependencyResolver();
    initialTasks.forEach((t) => this.tasks.set(t.id, t));
  }

  public getAllTasks(): Task[] {
    return Array.from(this.tasks.values());
  }

  public getTaskById(id: UUID): Task | undefined {
    return this.tasks.get(id);
  }

  public getTasksByProject(projectId: UUID): Task[] {
    return this.getAllTasks().filter((t) => t.projectId === projectId);
  }

  public createTask(taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Task {
    const id = `task_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    const now = new Date().toISOString();

    const newTask: Task = {
      ...taskData,
      id,
      createdAt: now,
      updatedAt: now,
    };

    this.tasks.set(id, newTask);
    return newTask;
  }

  public updateTaskState(taskId: UUID, newState: TaskState, userId: UUID): Task {
    const task = this.getTaskById(taskId);
    if (!task) {
      throw new Error(`Task with ID ${taskId} not found.`);
    }

    const updatedTask = this.workflowEngine.transitionTask(task, newState, userId);
    this.tasks.set(taskId, updatedTask);
    return updatedTask;
  }

  public getTopologicallySortedTasks(projectId: UUID): Task[] {
    const projectTasks = this.getTasksByProject(projectId);
    const result = this.dependencyResolver.sortTasksTopologically(projectTasks);

    if (result.hasCycle) {
      throw new Error(`Project ${projectId} has cyclic task dependencies!`);
    }

    const taskMap = new Map<UUID, Task>();
    projectTasks.forEach((t) => taskMap.set(t.id, t));

    return result.sortedTaskIds.map((id) => taskMap.get(id)!).filter(Boolean);
  }
}
