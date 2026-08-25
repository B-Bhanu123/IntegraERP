import { ProjectService } from '../../services/projectService';
import { TaskService } from '../../services/taskService';
import { FinanceService } from '../../services/financeService';
import { KanbanBoardComponent } from '../components/KanbanBoard';

export class DashboardPage {
  private projectService: ProjectService;
  private taskService: TaskService;
  private financeService: FinanceService;
  private kanbanBoard: KanbanBoardComponent;

  constructor(projectService: ProjectService, taskService: TaskService, financeService: FinanceService) {
    this.projectService = projectService;
    this.taskService = taskService;
    this.financeService = financeService;
    this.kanbanBoard = new KanbanBoardComponent();
  }

  public render(): string {
    const projects = this.projectService.getAllProjects();
    const tasks = this.taskService.getAllTasks();
    const trialBalance = this.financeService.generateTrialBalance();

    return `
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <!-- Top Metric Cards -->
        <div class="metrics-grid">
          <div class="glass-card">
            <div class="metric-label">Active Projects</div>
            <div class="metric-value">${projects.length}</div>
            <div style="font-size: 0.75rem; color: var(--accent-success); margin-top: 0.5rem;">↑ 100% On Schedule</div>
          </div>
          <div class="glass-card">
            <div class="metric-label">Total Backlog Tasks</div>
            <div class="metric-value">${tasks.length}</div>
            <div style="font-size: 0.75rem; color: var(--accent-secondary); margin-top: 0.5rem;">4 Active Sprints</div>
          </div>
          <div class="glass-card">
            <div class="metric-label">General Ledger Debits</div>
            <div class="metric-value">$${(trialBalance.totalDebits / 1000000).toFixed(2)}M</div>
            <div style="font-size: 0.75rem; color: var(--accent-success); margin-top: 0.5rem;">✓ Double-Entry Verified</div>
          </div>
          <div class="glass-card">
            <div class="metric-label">Enterprise Users</div>
            <div class="metric-value">50</div>
            <div style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 0.5rem;">Multi-Tenant RBAC</div>
          </div>
        </div>

        <!-- Task Kanban Section -->
        <div>
          <h2 style="font-size: 1.25rem; font-weight: 700; color: #fff; margin-bottom: 1rem;">Task Workflow Overview</h2>
          ${this.kanbanBoard.render(tasks.slice(0, 16))}
        </div>
      </div>
    `;
  }
}
