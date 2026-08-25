import { TaskService } from '../../services/taskService';
import { KanbanBoardComponent } from '../components/KanbanBoard';

export class TasksPage {
  private taskService: TaskService;
  private kanbanBoard: KanbanBoardComponent;

  constructor(taskService: TaskService) {
    this.taskService = taskService;
    this.kanbanBoard = new KanbanBoardComponent();
  }

  public render(searchQuery = ''): string {
    let tasks = this.taskService.getAllTasks();

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      tasks = tasks.filter((t) => t.title.toLowerCase().includes(q) || t.key.toLowerCase().includes(q));
    }

    return `
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <!-- Header Controls Bar -->
        <div class="glass-card" style="display: flex; justify-content: space-between; align-items: center; padding: 1rem 1.5rem;">
          <div style="display: flex; align-items: center; gap: 1rem; flex: 1; max-width: 500px;">
            <input 
              class="form-input" 
              type="text" 
              placeholder="Search tasks by title or key (e.g. INT-101)..." 
              value="${searchQuery}"
              style="width: 100%;"
              oninput="window.filterTasks(this.value)"
            />
          </div>
          <button class="btn btn-primary" onclick="window.openCreateTaskModal()">
            <span>+ Create Enterprise Task</span>
          </button>
        </div>

        <!-- Kanban Board View -->
        <div>
          <h2 style="font-size: 1.25rem; font-weight: 700; color: #fff; margin-bottom: 1rem;">Task Workflow Kanban</h2>
          ${this.kanbanBoard.render(tasks)}
        </div>

        <!-- Task Data List Table with Edit Action Buttons -->
        <div class="glass-card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <h2 style="font-size: 1.25rem; font-weight: 700; color: #fff;">All Task Records (${tasks.length})</h2>
          </div>
          <table class="data-table">
            <thead>
              <tr>
                <th>Key</th>
                <th>Title</th>
                <th>Type</th>
                <th>State</th>
                <th>Priority</th>
                <th>Est Hours</th>
                <th>Logged Hours</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${tasks
                .slice(0, 30)
                .map(
                  (task) => `
                <tr>
                  <td style="font-family: var(--font-mono); font-weight: 700; color: var(--accent-secondary);">${task.key}</td>
                  <td style="font-weight: 600; color: #fff;">${task.title}</td>
                  <td><span class="badge badge-info">${task.type}</span></td>
                  <td><span class="badge badge-warning">${task.state}</span></td>
                  <td><span class="badge badge-danger">${task.priority}</span></td>
                  <td>${task.estimatedHours}h</td>
                  <td>${task.loggedHours}h</td>
                  <td>
                    <button class="btn btn-secondary btn-sm" onclick="window.openEditTaskModal('${task.id}')">✏️ Edit</button>
                  </td>
                </tr>
              `
                )
                .join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }
}
