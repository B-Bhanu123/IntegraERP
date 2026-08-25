import { LedgerAccount, AccountType } from '../../core/models/finance';

export class FinanceEditModalComponent {
  public render(account?: LedgerAccount): string {
    const isEdit = !!account;
    const title = isEdit ? `Edit Account: ${account.accountCode}` : 'Create General Ledger Account';

    return `
      <div class="modal-overlay" id="financeModal">
        <div class="modal-content">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.75rem;">
            <h3 style="font-size: 1.25rem; font-weight: 700; color: #fff;">${title}</h3>
            <button class="btn btn-secondary btn-sm" onclick="window.closeModal()">✕</button>
          </div>

          <form id="financeForm" onsubmit="window.saveAccount(event, '${account ? account.id : ''}')">
            <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 1rem;">
              <div class="form-group">
                <label>Account Code</label>
                <input class="form-input" id="accCode" type="text" required value="${account ? account.accountCode : '1090'}" placeholder="e.g. 1090" />
              </div>
              <div class="form-group">
                <label>Account Name</label>
                <input class="form-input" id="accName" type="text" required value="${account ? account.name : ''}" placeholder="e.g. Operating Reserve Account" />
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
              <div class="form-group">
                <label>Account Type</label>
                <select class="form-select" id="accType">
                  <option value="ASSET" ${account?.type === AccountType.ASSET ? 'selected' : ''}>Asset</option>
                  <option value="LIABILITY" ${account?.type === AccountType.LIABILITY ? 'selected' : ''}>Liability</option>
                  <option value="EQUITY" ${account?.type === AccountType.EQUITY ? 'selected' : ''}>Equity</option>
                  <option value="REVENUE" ${account?.type === AccountType.REVENUE ? 'selected' : ''}>Revenue</option>
                  <option value="EXPENSE" ${account?.type === AccountType.EXPENSE ? 'selected' : ''}>Expense</option>
                </select>
              </div>
              <div class="form-group">
                <label>Current Balance ($)</label>
                <input class="form-input" id="accBalance" type="number" step="0.01" value="${account ? account.balance : 0.0}" />
              </div>
            </div>

            <div style="display: flex; justify-content: flex-end; gap: 1rem; margin-top: 1.5rem;">
              <button type="button" class="btn btn-secondary" onclick="window.closeModal()">Cancel</button>
              <button type="submit" class="btn btn-primary">${isEdit ? 'Save Changes' : 'Create Account'}</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }
}
