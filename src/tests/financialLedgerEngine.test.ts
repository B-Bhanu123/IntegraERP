import { describe, it, expect } from 'vitest';
import { FinancialLedgerEngine } from '../core/engine/financialLedgerEngine';
import { JournalEntry, LedgerAccount, AccountType } from '../core/models/finance';
import { EntityStatus } from '../core/models/types';

describe('FinancialLedgerEngine Tests', () => {
  const engine = new FinancialLedgerEngine();

  it('should validate balanced journal entry (Debits == Credits)', () => {
    const entry: JournalEntry = {
      id: 'je_1',
      entryNumber: 'JE-001',
      date: new Date().toISOString(),
      memo: 'Sales Invoice Payment',
      status: EntityStatus.APPROVED,
      lines: [
        { id: 'l1', accountId: 'acc_1', accountCode: '1010', debit: 1000, credit: 0 },
        { id: 'l2', accountId: 'acc_2', accountCode: '4010', debit: 0, credit: 1000 },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    expect(engine.validateJournalEntry(entry)).toBe(true);
  });

  it('should throw error for un-balanced journal entry', () => {
    const unBalancedEntry: JournalEntry = {
      id: 'je_2',
      entryNumber: 'JE-002',
      date: new Date().toISOString(),
      memo: 'Invalid Entry',
      status: EntityStatus.DRAFT,
      lines: [
        { id: 'l1', accountId: 'acc_1', accountCode: '1010', debit: 1000, credit: 0 },
        { id: 'l2', accountId: 'acc_2', accountCode: '4010', debit: 0, credit: 500 },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    expect(() => engine.validateJournalEntry(unBalancedEntry)).toThrowError(/un-balanced/);
  });

  it('should accurately calculate trial balance report', () => {
    const accounts: LedgerAccount[] = [
      { id: 'a1', accountCode: '1010', name: 'Cash', type: AccountType.ASSET, currency: 'USD', balance: 5000, isActive: true, createdAt: '', updatedAt: '' },
      { id: 'a2', accountCode: '4010', name: 'Revenue', type: AccountType.REVENUE, currency: 'USD', balance: 5000, isActive: true, createdAt: '', updatedAt: '' },
    ];

    const report = engine.calculateTrialBalance(accounts);
    expect(report.isBalanced).toBe(true);
    expect(report.totalDebits).toBe(5000);
    expect(report.totalCredits).toBe(5000);
  });
});
