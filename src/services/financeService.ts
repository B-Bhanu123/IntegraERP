import { LedgerAccount, JournalEntry, Invoice, Payment } from '../core/models/finance';
import { FinancialLedgerEngine, TrialBalanceReport } from '../core/engine/financialLedgerEngine';
import { UUID } from '../core/models/types';

export class FinanceService {
  private accounts: Map<UUID, LedgerAccount> = new Map();
  private journalEntries: Map<UUID, JournalEntry> = new Map();
  private ledgerEngine: FinancialLedgerEngine;

  constructor(initialAccounts: LedgerAccount[] = []) {
    this.ledgerEngine = new FinancialLedgerEngine();
    initialAccounts.forEach((acc) => this.accounts.set(acc.id, acc));
  }

  public getAllAccounts(): LedgerAccount[] {
    return Array.from(this.accounts.values());
  }

  public postJournalEntry(entry: JournalEntry): JournalEntry {
    this.ledgerEngine.validateJournalEntry(entry);
    this.journalEntries.set(entry.id, entry);

    // Apply balances to ledger accounts
    entry.lines.forEach((line) => {
      const account = this.accounts.get(line.accountId);
      if (account) {
        account.balance += line.debit - line.credit;
        account.updatedAt = new Date().toISOString();
      }
    });

    return entry;
  }

  public generateTrialBalance(): TrialBalanceReport {
    return this.ledgerEngine.calculateTrialBalance(this.getAllAccounts());
  }
}
