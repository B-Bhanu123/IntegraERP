import { JournalEntry, LedgerAccount, AccountType } from '../models/finance';
import { UUID } from '../models/types';

export interface TrialBalanceReport {
  asOfDate: string;
  totalDebits: number;
  totalCredits: number;
  isBalanced: boolean;
  variance: number;
  accountBalances: Array<{
    accountId: UUID;
    accountCode: string;
    accountName: string;
    accountType: AccountType;
    debitBalance: number;
    creditBalance: number;
  }>;
}

export class FinancialLedgerEngine {
  /**
   * Validates that a journal entry is double-entry compliant (Debits === Credits).
   */
  public validateJournalEntry(entry: JournalEntry): boolean {
    if (!entry.lines || entry.lines.length < 2) {
      throw new Error(`Journal Entry ${entry.entryNumber} must contain at least two line items.`);
    }

    let sumDebits = 0;
    let sumCredits = 0;

    entry.lines.forEach((line) => {
      if (line.debit < 0 || line.credit < 0) {
        throw new Error(`Line item in entry ${entry.entryNumber} cannot contain negative amounts.`);
      }
      sumDebits += line.debit;
      sumCredits += line.credit;
    });

    const difference = Math.abs(sumDebits - sumCredits);
    if (difference > 0.001) {
      throw new Error(
        `Journal entry ${entry.entryNumber} is un-balanced. Total Debits: ${sumDebits.toFixed(2)}, Total Credits: ${sumCredits.toFixed(2)}.`
      );
    }

    return true;
  }

  /**
   * Calculates trial balance report across accounts.
   */
  public calculateTrialBalance(accounts: LedgerAccount[]): TrialBalanceReport {
    let totalDebits = 0;
    let totalCredits = 0;

    const accountBalances = accounts.map((acc) => {
      let debitBalance = 0;
      let creditBalance = 0;

      // Asset and Expense accounts carry normal DEBIT balances
      if (acc.type === AccountType.ASSET || acc.type === AccountType.EXPENSE) {
        debitBalance = Math.max(0, acc.balance);
        creditBalance = Math.max(0, -acc.balance);
      } else {
        // Liability, Equity, Revenue accounts carry normal CREDIT balances
        creditBalance = Math.max(0, acc.balance);
        debitBalance = Math.max(0, -acc.balance);
      }

      totalDebits += debitBalance;
      totalCredits += creditBalance;

      return {
        accountId: acc.id,
        accountCode: acc.accountCode,
        accountName: acc.name,
        accountType: acc.type,
        debitBalance,
        creditBalance,
      };
    });

    const variance = Math.abs(totalDebits - totalCredits);
    const isBalanced = variance < 0.01;

    return {
      asOfDate: new Date().toISOString(),
      totalDebits,
      totalCredits,
      isBalanced,
      variance,
      accountBalances,
    };
  }
}
