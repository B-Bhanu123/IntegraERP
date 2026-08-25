/**
 * IntegraERP Enterprise Dictionaries & Standard Catalogs
 * Includes Standard Chart of Accounts (COA), International Tax Jurisdictions,
 * Standard Product Catalog, Department Hierarchy, and Task Templates.
 */

export interface ChartOfAccountDefinition {
  accountCode: string;
  accountName: string;
  category: 'ASSET' | 'LIABILITY' | 'EQUITY' | 'REVENUE' | 'EXPENSE';
  subCategory: string;
  description: string;
  gaapCode: string;
  ifrsCode: string;
}

export const STANDARD_CHART_OF_ACCOUNTS: ChartOfAccountDefinition[] = [
  // 1000s - Assets
  { accountCode: '1010', accountName: 'Cash & Cash Equivalents - Operating', category: 'ASSET', subCategory: 'Current Assets', description: 'Main operating bank account balance', gaapCode: '101.1', ifrsCode: 'IAS1.54a' },
  { accountCode: '1020', accountName: 'Petty Cash Reserve', category: 'ASSET', subCategory: 'Current Assets', description: 'Physical cash for small office incidentals', gaapCode: '101.2', ifrsCode: 'IAS1.54a' },
  { accountCode: '1050', accountName: 'Short-Term Money Market Investments', category: 'ASSET', subCategory: 'Current Assets', description: 'Liquid short term commercial paper', gaapCode: '102.1', ifrsCode: 'IAS1.54d' },
  { accountCode: '1100', accountName: 'Accounts Receivable - Trade', category: 'ASSET', subCategory: 'Current Assets', description: 'Invoiced customer balances due within 30-90 days', gaapCode: '110.0', ifrsCode: 'IFRS7.8' },
  { accountCode: '1110', accountName: 'Allowance for Doubtful Accounts', category: 'ASSET', subCategory: 'Current Assets', description: 'Contra-asset reserve for estimated uncollectible receivables', gaapCode: '110.1', ifrsCode: 'IFRS9.5.5' },
  { accountCode: '1200', accountName: 'Merchandise Finished Goods Inventory', category: 'ASSET', subCategory: 'Current Assets', description: 'Cost of products available for immediate customer sale', gaapCode: '120.1', ifrsCode: 'IAS2' },
  { accountCode: '1210', accountName: 'Raw Materials & Components Inventory', category: 'ASSET', subCategory: 'Current Assets', description: 'Raw parts awaiting assembly or production', gaapCode: '120.2', ifrsCode: 'IAS2' },
  { accountCode: '1220', accountName: 'Work-In-Progress (WIP) Inventory', category: 'ASSET', subCategory: 'Current Assets', description: 'Goods currently in active manufacturing process', gaapCode: '120.3', ifrsCode: 'IAS2' },
  { accountCode: '1300', accountName: 'Prepaid Software Licenses & Subscriptions', category: 'ASSET', subCategory: 'Current Assets', description: 'Annual cloud vendor subscriptions paid in advance', gaapCode: '130.1', ifrsCode: 'IAS1.78b' },
  { accountCode: '1310', accountName: 'Prepaid Corporate Insurance', category: 'ASSET', subCategory: 'Current Assets', description: 'General liability insurance paid ahead', gaapCode: '130.2', ifrsCode: 'IAS1.78b' },
  { accountCode: '1500', accountName: 'Computer Equipment & Servers', category: 'ASSET', subCategory: 'Fixed Assets', description: 'Datacenter hardware and developer workstations', gaapCode: '150.1', ifrsCode: 'IAS16' },
  { accountCode: '1510', accountName: 'Accumulated Depreciation - Computers', category: 'ASSET', subCategory: 'Fixed Assets', description: 'Contra-asset accumulated depreciation on hardware', gaapCode: '150.2', ifrsCode: 'IAS16' },
  { accountCode: '1600', accountName: 'Office Furniture & Leasehold Improvements', category: 'ASSET', subCategory: 'Fixed Assets', description: 'Building enhancements and office desks', gaapCode: '160.1', ifrsCode: 'IAS16' },
  { accountCode: '1700', accountName: 'Capitalized Proprietary Software Development', category: 'ASSET', subCategory: 'Intangible Assets', description: 'Internal-use software creation costs capitalized under ASC 350-40', gaapCode: '170.1', ifrsCode: 'IAS38' },

  // 2000s - Liabilities
  { accountCode: '2010', accountName: 'Accounts Payable - Trade Vendors', category: 'LIABILITY', subCategory: 'Current Liabilities', description: 'Vendor invoices due within 30 days', gaapCode: '201.0', ifrsCode: 'IAS1.54k' },
  { accountCode: '2020', accountName: 'Accrued Payroll & Bonuses', category: 'LIABILITY', subCategory: 'Current Liabilities', description: 'Earned employee compensation pending payout', gaapCode: '202.1', ifrsCode: 'IAS19' },
  { accountCode: '2030', accountName: 'Accrued Sales & VAT Taxes Payable', category: 'LIABILITY', subCategory: 'Current Liabilities', description: 'Collected tax monies owed to government entities', gaapCode: '203.1', ifrsCode: 'IAS37' },
  { accountCode: '2040', accountName: 'Deferred Subscription Revenue', category: 'LIABILITY', subCategory: 'Current Liabilities', description: 'Unearned revenue for upfront customer software plans', gaapCode: '204.0', ifrsCode: 'IFRS15' },
  { accountCode: '2500', accountName: 'Long-Term Bank Credit Facility', category: 'LIABILITY', subCategory: 'Non-Current Liabilities', description: 'Multi-year revolving debt financing', gaapCode: '250.1', ifrsCode: 'IFRS7' },

  // 3000s - Equity
  { accountCode: '3010', accountName: 'Common Stock - Class A Authorized', category: 'EQUITY', subCategory: 'Shareholders Equity', description: 'Par value of issued common stock', gaapCode: '301.0', ifrsCode: 'IAS1.54r' },
  { accountCode: '3020', accountName: 'Additional Paid-In Capital (APIC)', category: 'EQUITY', subCategory: 'Shareholders Equity', description: 'Capital paid by investors above par value', gaapCode: '302.0', ifrsCode: 'IAS1.54r' },
  { accountCode: '3050', accountName: 'Retained Earnings', category: 'EQUITY', subCategory: 'Shareholders Equity', description: 'Cumulative historical net income retained', gaapCode: '305.0', ifrsCode: 'IAS1.54r' },

  // 4000s - Revenues
  { accountCode: '4010', accountName: 'SaaS Software License Subscription Revenue', category: 'REVENUE', subCategory: 'Operating Revenue', description: 'Recurring cloud platform subscription sales', gaapCode: '401.0', ifrsCode: 'IFRS15' },
  { accountCode: '4020', accountName: 'Professional Services & Implementation Consulting', category: 'REVENUE', subCategory: 'Operating Revenue', description: 'Custom integration and setup service fees', gaapCode: '402.0', ifrsCode: 'IFRS15' },
  { accountCode: '4030', accountName: 'Enterprise Training & Support Contracts', category: 'REVENUE', subCategory: 'Operating Revenue', description: 'Premium 24/7 technical support contracts', gaapCode: '403.0', ifrsCode: 'IFRS15' },

  // 5000s - Expenses
  { accountCode: '5010', accountName: 'Software Engineering Salaries & Wages', category: 'EXPENSE', subCategory: 'Research & Development', description: 'Base compensation for R&D software engineers', gaapCode: '501.0', ifrsCode: 'IAS19' },
  { accountCode: '5020', accountName: 'Cloud Infrastructure Hosting (AWS/GCP/Azure)', category: 'EXPENSE', subCategory: 'Cost of Goods Sold (COGS)', description: 'Direct hosting compute and database costs', gaapCode: '502.0', ifrsCode: 'IAS2' },
  { accountCode: '5030', accountName: 'Sales & Marketing Advertising Campaigns', category: 'EXPENSE', subCategory: 'Sales & Marketing', description: 'Digital marketing, trade shows, and brand promotion', gaapCode: '503.0', ifrsCode: 'IAS1.104' },
  { accountCode: '5040', accountName: 'General & Administrative Rent Expense', category: 'EXPENSE', subCategory: 'General & Administrative', description: 'Lease payments for global headquarters', gaapCode: '504.0', ifrsCode: 'IFRS16' },
  { accountCode: '5050', accountName: 'Executive & Legal Advisory Fees', category: 'EXPENSE', subCategory: 'General & Administrative', description: 'Retainers for legal counsel and accounting audit', gaapCode: '505.0', ifrsCode: 'IAS1.104' },
];

export interface TaxJurisdiction {
  code: string;
  name: string;
  country: string;
  standardVatRatePercentage: number;
  reducedRatePercentage?: number;
  taxRegistrationFormat: string;
}

export const GLOBAL_TAX_JURISDICTIONS: TaxJurisdiction[] = [
  { code: 'US_CA', name: 'California State & Local Sales Tax', country: 'United States', standardVatRatePercentage: 7.25, taxRegistrationFormat: 'CA-99999999' },
  { code: 'US_NY', name: 'New York Combined Sales Tax', country: 'United States', standardVatRatePercentage: 8.875, taxRegistrationFormat: 'NY-88888888' },
  { code: 'US_TX', name: 'Texas State Sales Tax', country: 'United States', standardVatRatePercentage: 6.25, taxRegistrationFormat: 'TX-77777777' },
  { code: 'UK_VAT', name: 'United Kingdom Value Added Tax', country: 'United Kingdom', standardVatRatePercentage: 20.0, reducedRatePercentage: 5.0, taxRegistrationFormat: 'GB123456789' },
  { code: 'DE_VAT', name: 'Germany Mehrwertsteuer (MwSt)', country: 'Germany', standardVatRatePercentage: 19.0, reducedRatePercentage: 7.0, taxRegistrationFormat: 'DE123456789' },
  { code: 'FR_TVA', name: 'France Taxe sur la valeur ajoutée', country: 'France', standardVatRatePercentage: 20.0, reducedRatePercentage: 10.0, taxRegistrationFormat: 'FR12345678901' },
  { code: 'IN_GST', name: 'India Goods and Services Tax', country: 'India', standardVatRatePercentage: 18.0, reducedRatePercentage: 5.0, taxRegistrationFormat: '27AAAAA0000A1Z5' },
  { code: 'JP_CT', name: 'Japan Consumption Tax', country: 'Japan', standardVatRatePercentage: 10.0, reducedRatePercentage: 8.0, taxRegistrationFormat: 'T1234567890123' },
  { code: 'AU_GST', name: 'Australia Goods and Services Tax', country: 'Australia', standardVatRatePercentage: 10.0, taxRegistrationFormat: 'ABN 12 345 678 901' },
  { code: 'CA_HST', name: 'Canada Harmonized Sales Tax (Ontario)', country: 'Canada', standardVatRatePercentage: 13.0, taxRegistrationFormat: '123456789 RT 0001' },
];
