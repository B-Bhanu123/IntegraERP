import { Task, TaskState } from '../models/project';

export interface ProjectAnalyticsSummary {
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  blockedTasks: number;
  completionRatePercentage: number;
  averageEstimatedHours: number;
  averageLoggedHours: number;
  varianceHours: number;
}

export class AnalyticsEngine {
  public calculateProjectSummary(tasks: Task[]): ProjectAnalyticsSummary {
    if (!tasks || tasks.length === 0) {
      return {
        totalTasks: 0,
        completedTasks: 0,
        inProgressTasks: 0,
        blockedTasks: 0,
        completionRatePercentage: 0,
        averageEstimatedHours: 0,
        averageLoggedHours: 0,
        varianceHours: 0,
      };
    }

    const totalTasks = tasks.length;
    let completedTasks = 0;
    let inProgressTasks = 0;
    let blockedTasks = 0;
    let totalEstimated = 0;
    let totalLogged = 0;

    tasks.forEach((task) => {
      if (task.state === TaskState.DONE) completedTasks++;
      if (task.state === TaskState.IN_PROGRESS) inProgressTasks++;
      if (task.state === TaskState.BLOCKED) blockedTasks++;

      totalEstimated += task.estimatedHours || 0;
      totalLogged += task.loggedHours || 0;
    });

    const completionRatePercentage = Math.round((completedTasks / totalTasks) * 100);
    const averageEstimatedHours = Math.round((totalEstimated / totalTasks) * 10) / 10;
    const averageLoggedHours = Math.round((totalLogged / totalTasks) * 10) / 10;
    const varianceHours = totalLogged - totalEstimated;

    return {
      totalTasks,
      completedTasks,
      inProgressTasks,
      blockedTasks,
      completionRatePercentage,
      averageEstimatedHours,
      averageLoggedHours,
      varianceHours,
    };
  }
}
