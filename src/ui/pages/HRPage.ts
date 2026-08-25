import { HRService } from '../../services/hrService';
import { ENTERPRISE_DEPARTMENTS } from '../../data/fixtures/largeDatasets';

export class HRPage {
  private hrService: HRService;

  constructor(hrService: HRService) {
    this.hrService = hrService;
  }

  public render(): string {
    const employees = this.hrService.getAllEmployees();

    return `
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <!-- Department Summary -->
        <div>
          <h2 style="font-size: 1.25rem; font-weight: 700; color: #fff; margin-bottom: 1rem;">Department Structure & Allocated Budgets</h2>
          <div class="metrics-grid">
            ${ENTERPRISE_DEPARTMENTS.slice(0, 4)
              .map(
                (dept) => `
              <div class="glass-card">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span class="badge badge-info">${dept.code}</span>
                  <span class="badge badge-success">ACTIVE</span>
                </div>
                <div style="font-size: 1.1rem; font-weight: 700; color: #fff; margin-top: 0.75rem;">${dept.name}</div>
                <div style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.25rem;">Budget: <strong>$${dept.budgetAllocated.toLocaleString()}</strong></div>
              </div>
            `
              )
              .join('')}
          </div>
        </div>

        <!-- Employee Directory & Monthly Payroll Calculation Table -->
        <div class="glass-card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <h2 style="font-size: 1.25rem; font-weight: 700; color: #fff;">Employee Compensation & Payroll Calculator</h2>
            <button class="btn btn-primary btn-sm" onclick="window.openCreateEmployeeModal()">+ Add Employee</button>
          </div>
          <table class="data-table">
            <thead>
              <tr>
                <th>Emp ID</th>
                <th>Name</th>
                <th>Job Title</th>
                <th>Employment Type</th>
                <th>Annual Base Salary</th>
                <th>Monthly Net Salary</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${employees
                .map((emp) => {
                  const payroll = this.hrService.calculateMonthlyPayroll(emp.id);
                  return `
                  <tr>
                    <td style="font-family: var(--font-mono); font-weight: 700; color: var(--accent-secondary);">${emp.employeeId}</td>
                    <td style="font-weight: 600; color: #fff;">${emp.firstName} ${emp.lastName}</td>
                    <td>${emp.jobTitle}</td>
                    <td><span class="badge badge-info">${emp.employmentType}</span></td>
                    <td style="font-family: var(--font-mono);">$${emp.baseSalary.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                    <td style="font-family: var(--font-mono); font-weight: 700; color: var(--accent-success);">$${payroll.netSalary.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                    <td>
                      <div style="display: flex; gap: 0.5rem;">
                        <button class="btn btn-secondary btn-sm" onclick="window.openEditEmployeeModal('${emp.id}')">✏️ Edit</button>
                        <button class="btn btn-secondary btn-sm" onclick="alert('Monthly Gross: $${payroll.grossSalary.toFixed(2)}\\nFederal Tax: $${payroll.federalTax.toFixed(2)}\\nState Tax: $${payroll.stateTax.toFixed(2)}\\nNet Payout: $${payroll.netSalary.toFixed(2)}')">
                          🔍 Breakdown
                        </button>
                      </div>
                    </td>
                  </tr>
                `;
                })
                .join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }
}
