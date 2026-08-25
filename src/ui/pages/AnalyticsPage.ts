import { TaskService } from '../../services/taskService';
import { FinanceService } from '../../services/financeService';
import { AnalyticsEngine } from '../../core/engine/analyticsEngine';
import { ExportService } from '../../services/exportService';

export class AnalyticsPage {
  private taskService: TaskService;
  private financeService: FinanceService;
  private analyticsEngine: AnalyticsEngine;

  constructor(taskService: TaskService, financeService: FinanceService) {
    this.taskService = taskService;
    this.financeService = financeService;
    this.analyticsEngine = new AnalyticsEngine();
  }

  public render(): string {
    const tasks = this.taskService.getAllTasks();
    const summary = this.analyticsEngine.calculateProjectSummary(tasks);

    return `
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <!-- Analytics & Report Export Controls -->
        <div class="glass-card" style="display: flex; justify-content: space-between; align-items: center; padding: 1.5rem;">
          <div>
            <h2 style="font-size: 1.25rem; font-weight: 700; color: #fff;">Enterprise Data Export Engine</h2>
            <p style="font-size: 0.875rem; color: var(--text-secondary);">Download real-time audit reports, task datasets, and financial ledgers.</p>
          </div>
          <div style="display: flex; gap: 1rem;">
            <button class="btn btn-secondary" onclick="window.downloadTaskJSON()">📥 Export JSON</button>
            <button class="btn btn-primary" onclick="window.downloadTaskCSV()">📊 Export CSV</button>
          </div>
        </div>

        <!-- Metric Velocity Grid -->
        <div class="metrics-grid">
          <div class="glass-card">
            <div class="metric-label">Completion Rate</div>
            <div class="metric-value">${summary.completionRatePercentage}%</div>
            <div style="font-size: 0.75rem; color: var(--accent-success); margin-top: 0.5rem;">${summary.completedTasks} of ${summary.totalTasks} Tasks Done</div>
          </div>
          <div class="glass-card">
            <div class="metric-label">Average Estimated Hours</div>
            <div class="metric-value">${summary.averageEstimatedHours}h</div>
            <div style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 0.5rem;">Per Task Target</div>
          </div>
          <div class="glass-card">
            <div class="metric-label">Average Logged Hours</div>
            <div class="metric-value">${summary.averageLoggedHours}h</div>
            <div style="font-size: 0.75rem; color: var(--accent-secondary); margin-top: 0.5rem;">Actual Work Recorded</div>
          </div>
          <div class="glass-card">
            <div class="metric-label">Work Variance</div>
            <div class="metric-value" style="color: ${summary.varianceHours <= 0 ? 'var(--accent-success)' : 'var(--accent-warning)'};">${summary.varianceHours > 0 ? '+' : ''}${summary.varianceHours}h</div>
            <div style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 0.5rem;">Schedule Efficiency</div>
          </div>
        </div>
      </div>
    `;
  }
}
