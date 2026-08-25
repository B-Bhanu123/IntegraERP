import { Task, TaskState } from '../../core/models/project';

export class KanbanBoardComponent {
  public render(tasks: Task[]): string {
    const columns = [
      { state: TaskState.TODO, title: 'To Do', badgeClass: 'badge-info' },
      { state: TaskState.IN_PROGRESS, title: 'In Progress', badgeClass: 'badge-warning' },
      { state: TaskState.IN_REVIEW, title: 'In Review', badgeClass: 'badge-info' },
      { state: TaskState.DONE, title: 'Done', badgeClass: 'badge-success' },
    ];

    return `
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; width: 100%;">
        ${columns
          .map((col) => {
            const colTasks = tasks.filter((t) => t.state === col.state);
            return `
            <div class="glass-card" style="padding: 1rem;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem;">
                <h3 style="font-size: 1rem; font-weight: 700;">${col.title}</h3>
                <span class="badge ${col.badgeClass}">${colTasks.length}</span>
              </div>
              <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                ${colTasks
                  .map(
                    (task) => `
                  <div class="glass-card" style="padding: 0.75rem; background: rgba(31, 41, 61, 0.5); font-size: 0.875rem;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                      <strong style="color: var(--accent-secondary);">${task.key}</strong>
                      <span class="badge badge-info" style="font-size: 0.65rem;">${task.priority}</span>
                    </div>
                    <div style="font-weight: 600; color: #fff; margin-bottom: 0.5rem;">${task.title}</div>
                    <div style="font-size: 0.75rem; color: var(--text-secondary); display: flex; justify-content: space-between;">
                      <span>Est: ${task.estimatedHours}h</span>
                      <span>Logged: ${task.loggedHours}h</span>
                    </div>
                  </div>
                `
                  )
                  .join('')}
              </div>
            </div>
          `;
          })
          .join('')}
      </div>
    `;
  }
}
