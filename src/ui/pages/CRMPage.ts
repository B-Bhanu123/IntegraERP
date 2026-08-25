import { CRMService } from '../../services/crmService';

export class CRMPage {
  private crmService: CRMService;

  constructor(crmService: CRMService) {
    this.crmService = crmService;
  }

  public render(): string {
    const customers = this.crmService.getAllCustomers();
    const leads = this.crmService.getAllLeads();

    return `
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <!-- CRM Sales Funnel Cards -->
        <div class="metrics-grid">
          <div class="glass-card">
            <div class="metric-label">Total Enterprise Accounts</div>
            <div class="metric-value">${customers.length}</div>
            <div style="font-size: 0.75rem; color: var(--accent-success); margin-top: 0.5rem;">98% Retention Rate</div>
          </div>
          <div class="glass-card">
            <div class="metric-label">Active Lead Pipeline</div>
            <div class="metric-value">${leads.length}</div>
            <div style="font-size: 0.75rem; color: var(--accent-secondary); margin-top: 0.5rem;">High Value Funnel</div>
          </div>
          <div class="glass-card">
            <div class="metric-label">Pipeline Contract Value</div>
            <div class="metric-value">$4.85M</div>
            <div style="font-size: 0.75rem; color: var(--accent-success); margin-top: 0.5rem;">Target Q3 Close</div>
          </div>
        </div>

        <!-- Enterprise Customer Accounts Table -->
        <div class="glass-card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <h2 style="font-size: 1.25rem; font-weight: 700; color: #fff;">Customer Accounts & Credit Limits</h2>
          </div>
          <table class="data-table">
            <thead>
              <tr>
                <th>Customer Code</th>
                <th>Company Name</th>
                <th>Primary Contact</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Credit Limit</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${customers
                .map(
                  (cust) => `
                <tr>
                  <td style="font-family: var(--font-mono); font-weight: 700; color: var(--accent-secondary);">${cust.customerCode}</td>
                  <td style="font-weight: 600; color: #fff;">${cust.companyName}</td>
                  <td>${cust.contactName}</td>
                  <td>${cust.email}</td>
                  <td>${cust.phone}</td>
                  <td style="font-family: var(--font-mono); font-weight: 700; color: var(--accent-success);">$${cust.creditLimit.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                  <td><span class="badge badge-success">ACTIVE</span></td>
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
