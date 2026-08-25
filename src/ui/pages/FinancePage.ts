import { FinanceService } from '../../services/financeService';
import { FinancialLedgerTableComponent } from '../components/FinancialLedgerTable';

export class FinancePage {
  private financeService: FinanceService;
  private tableComponent: FinancialLedgerTableComponent;

  constructor(financeService: FinanceService) {
    this.financeService = financeService;
    this.tableComponent = new FinancialLedgerTableComponent();
  }

  public render(): string {
    const accounts = this.financeService.getAllAccounts();
    const trialBalance = this.financeService.generateTrialBalance();

    return `
      <div>
        ${this.tableComponent.render(accounts, trialBalance)}
      </div>
    `;
  }
}
