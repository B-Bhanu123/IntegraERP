import { BaseEntity, UUID, ISODateString, CurrencyCode, EntityStatus } from './types';

export enum AccountType {
  ASSET = 'ASSET',
  LIABILITY = 'LIABILITY',
  EQUITY = 'EQUITY',
  REVENUE = 'REVENUE',
  EXPENSE = 'EXPENSE',
}

export interface LedgerAccount extends BaseEntity {
  accountCode: string;
  name: string;
  type: AccountType;
  currency: CurrencyCode;
  balance: number;
  isActive: boolean;
  parentAccountId?: UUID;
  description?: string;
}

export interface JournalEntryLine {
  id: UUID;
  accountId: UUID;
  accountCode: string;
  debit: number;
  credit: number;
  description?: string;
}

export interface JournalEntry extends BaseEntity {
  entryNumber: string;
  date: ISODateString;
  reference?: string;
  memo: string;
  lines: JournalEntryLine[];
  status: EntityStatus;
  postedAt?: ISODateString;
  postedBy?: UUID;
}

export interface InvoiceItem {
  id: UUID;
  description: string;
  quantity: number;
  unitPrice: number;
  taxRatePercentage: number;
  totalAmount: number;
  productId?: UUID;
}

export interface Invoice extends BaseEntity {
  invoiceNumber: string;
  customerId: UUID;
  issueDate: ISODateString;
  dueDate: ISODateString;
  status: EntityStatus; // DRAFT, PENDING_APPROVAL, APPROVED, PAID, OVERDUE, CANCELLED
  items: InvoiceItem[];
  subtotal: number;
  taxTotal: number;
  discountTotal: number;
  grandTotal: number;
  currency: CurrencyCode;
  notes?: string;
}

export interface Payment extends BaseEntity {
  paymentNumber: string;
  invoiceId?: UUID;
  customerId?: UUID;
  amount: number;
  currency: CurrencyCode;
  paymentMethod: 'CREDIT_CARD' | 'BANK_TRANSFER' | 'CHECK' | 'CASH' | 'ACH';
  paymentDate: ISODateString;
  referenceNumber?: string;
  status: EntityStatus;
}

export interface TaxCalculation {
  taxableAmount: number;
  taxRate: number;
  taxAmount: number;
  taxCode: string;
  jurisdiction: string;
}
