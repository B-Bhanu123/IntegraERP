import { LedgerAccount } from '../../core/models/finance';
import { TrialBalanceReport } from '../../core/engine/financialLedgerEngine';

export class FinancialLedgerTableComponent {
  public render(accounts: LedgerAccount[], trialBalance: TrialBalanceReport): string {
    return `
      <div class="glass-card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
          <div>
            <h2 style="font-size: 1.25rem; font-weight: 700; color: #fff;">General Ledger Chart of Accounts</h2>
            <p style="font-size: 0.875rem; color: var(--text-secondary);">Real-time account balances and trial balance integrity status.</p>
          </div>
          <div class="badge ${trialBalance.isBalanced ? 'badge-success' : 'badge-danger'}" style="font-size: 0.875rem; padding: 0.5rem 1rem;">
            ${trialBalance.isBalanced ? '✓ DOUBLE-ENTRY BALANCED' : '⚠ UNBALANCED LEDGER'}
          </div>
        </div>

        <div class="metrics-grid" style="grid-template-columns: repeat(3, 1fr); margin-bottom: 1.5rem;">
          <div class="glass-card" style="padding: 1rem;">
            <div class="metric-label">Total Debits</div>
            <div class="metric-value" style="color: var(--accent-success);">$${trialBalance.totalDebits.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
          </div>
          <div class="glass-card" style="padding: 1rem;">
            <div class="metric-label">Total Credits</div>
            <div class="metric-value" style="color: var(--accent-secondary);">$${trialBalance.totalCredits.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
          </div>
          <div class="glass-card" style="padding: 1rem;">
            <div class="metric-label">Net Variance</div>
            <div class="metric-value" style="color: ${trialBalance.variance === 0 ? 'var(--accent-success)' : 'var(--accent-danger)'};">$${trialBalance.variance.toFixed(2)}</div>
          </div>
        </div>

        <table class="data-table">
          <thead>
            <tr>
              <th>Account Code</th>
              <th>Account Name</th>
              <th>Account Type</th>
              <th>Currency</th>
              <th>Debit Balance</th>
              <th>Credit Balance</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${trialBalance.accountBalances
              .map(
                (acc) => `
              <tr>
                <td style="font-family: var(--font-mono); font-weight: 600; color: var(--accent-secondary);">${acc.accountCode}</td>
                <td style="font-weight: 600; color: #fff;">${acc.accountName}</td>
                <td><span class="badge badge-info">${acc.accountType}</span></td>
                <td>USD</td>
                <td style="font-family: var(--font-mono);">$${acc.debitBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                <td style="font-family: var(--font-mono);">$${acc.creditBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                <td><span class="badge badge-success">ACTIVE</span></td>
              </tr>
            `
              )
              .join('')}
          </tbody>
        </table>
      </div>
    `;
  }
}
