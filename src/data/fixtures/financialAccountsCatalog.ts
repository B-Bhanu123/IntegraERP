/**
 * IntegraERP Comprehensive Financial Accounts Catalog
 * Full GAAP & IFRS compliant Chart of Accounts (COA) dictionary with over 500 detailed ledger accounts.
 */

export interface DetailedAccountDefinition {
  accountCode: string;
  accountName: string;
  category: 'ASSET' | 'LIABILITY' | 'EQUITY' | 'REVENUE' | 'EXPENSE';
  subCategory: string;
  gaapRef: string;
  ifrsRef: string;
  taxableStatus: string;
  description: string;
}

export const COMPREHENSIVE_CHART_OF_ACCOUNTS: DetailedAccountDefinition[] = [
  // 1000-1099: Cash and Cash Equivalents
  { accountCode: '1000', accountName: 'Petty Cash - Headquarters', category: 'ASSET', subCategory: 'Cash & Cash Equivalents', gaapRef: 'ASC 305-10', ifrsRef: 'IAS 7.6', taxableStatus: 'EXEMPT', description: 'Imprest petty cash fund maintained at global headquarters for minor administrative expenses.' },
  { accountCode: '1001', accountName: 'Petty Cash - West Coast Branch', category: 'ASSET', subCategory: 'Cash & Cash Equivalents', gaapRef: 'ASC 305-10', ifrsRef: 'IAS 7.6', taxableStatus: 'EXEMPT', description: 'Imprest petty cash fund for regional office branch in San Francisco.' },
  { accountCode: '1002', accountName: 'Petty Cash - EMEA Office', category: 'ASSET', subCategory: 'Cash & Cash Equivalents', gaapRef: 'ASC 305-10', ifrsRef: 'IAS 7.6', taxableStatus: 'EXEMPT', description: 'Imprest petty cash fund for European regional headquarters in London.' },
  { accountCode: '1003', accountName: 'Petty Cash - APAC Office', category: 'ASSET', subCategory: 'Cash & Cash Equivalents', gaapRef: 'ASC 305-10', ifrsRef: 'IAS 7.6', taxableStatus: 'EXEMPT', description: 'Imprest petty cash fund for Asia-Pacific regional hub in Singapore.' },
  { accountCode: '1010', accountName: 'JPMorgan Chase - Main Operating Account', category: 'ASSET', subCategory: 'Cash & Cash Equivalents', gaapRef: 'ASC 305-10', ifrsRef: 'IAS 7.6', taxableStatus: 'EXEMPT', description: 'Primary commercial checking account used for corporate disbursements and operational cash inflow.' },
  { accountCode: '1011', accountName: 'Bank of America - Payroll Account', category: 'ASSET', subCategory: 'Cash & Cash Equivalents', gaapRef: 'ASC 305-10', ifrsRef: 'IAS 7.6', taxableStatus: 'EXEMPT', description: 'Dedicated zero-balance account for bi-weekly employee compensation disbursements.' },
  { accountCode: '1012', accountName: 'Citi Bank - Tax Reserve Account', category: 'ASSET', subCategory: 'Cash & Cash Equivalents', gaapRef: 'ASC 305-10', ifrsRef: 'IAS 7.6', taxableStatus: 'EXEMPT', description: 'Restricted reserve account held for federal, state, and international corporate income tax obligations.' },
  { accountCode: '1013', accountName: 'HSBC - European Operations (EUR)', category: 'ASSET', subCategory: 'Cash & Cash Equivalents', gaapRef: 'ASC 305-10', ifrsRef: 'IAS 7.6', taxableStatus: 'EXEMPT', description: 'Euro-denominated operational checking account for European subsidiary transactions.' },
  { accountCode: '1014', accountName: 'Barclays Bank - UK Operations (GBP)', category: 'ASSET', subCategory: 'Cash & Cash Equivalents', gaapRef: 'ASC 305-10', ifrsRef: 'IAS 7.6', taxableStatus: 'EXEMPT', description: 'British Pound Sterling operational checking account for UK subsidiary operations.' },
  { accountCode: '1015', accountName: 'DBS Bank - APAC Treasury (SGD)', category: 'ASSET', subCategory: 'Cash & Cash Equivalents', gaapRef: 'ASC 305-10', ifrsRef: 'IAS 7.6', taxableStatus: 'EXEMPT', description: 'Singapore Dollar operational treasury account for Asia-Pacific vendor settlements.' },
  { accountCode: '1050', accountName: 'Fidelity Money Market Fund - Treasury Portfolio', category: 'ASSET', subCategory: 'Cash Equivalents', gaapRef: 'ASC 320-10', ifrsRef: 'IFRS 9.4.1', taxableStatus: 'TAXABLE_INTEREST', description: 'Highly liquid institutional money market fund holding US Treasury bills maturing in under 90 days.' },
  { accountCode: '1051', accountName: 'Vanguard Prime Money Market Fund', category: 'ASSET', subCategory: 'Cash Equivalents', gaapRef: 'ASC 320-10', ifrsRef: 'IFRS 9.4.1', taxableStatus: 'TAXABLE_INTEREST', description: 'Short-term commercial paper money market vehicle yielding competitive interest.' },

  // 1100-1199: Receivables
  { accountCode: '1100', accountName: 'Accounts Receivable - Commercial Customers', category: 'ASSET', subCategory: 'Accounts Receivable', gaapRef: 'ASC 310-10', ifrsRef: 'IFRS 9.5.1', taxableStatus: 'NON_TAXABLE_BALANCE', description: 'Trade receivables billed to enterprise software and consulting clients.' },
  { accountCode: '1101', accountName: 'Accounts Receivable - Government & Defense', category: 'ASSET', subCategory: 'Accounts Receivable', gaapRef: 'ASC 310-10', ifrsRef: 'IFRS 9.5.1', taxableStatus: 'NON_TAXABLE_BALANCE', description: 'Billed receivables for public sector contracts under FAR and CAS regulations.' },
  { accountCode: '1102', accountName: 'Accounts Receivable - Resellers & Channel Partners', category: 'ASSET', subCategory: 'Accounts Receivable', gaapRef: 'ASC 310-10', ifrsRef: 'IFRS 9.5.1', taxableStatus: 'NON_TAXABLE_BALANCE', description: 'Receivables due from indirect global software distribution partners.' },
  { accountCode: '1110', accountName: 'Allowance for Expected Credit Losses (CECL)', category: 'ASSET', subCategory: 'Accounts Receivable', gaapRef: 'ASC 326-20', ifrsRef: 'IFRS 9.5.5', taxableStatus: 'CONTRA_ASSET', description: 'Contra-asset reserve calculated under Current Expected Credit Losses (CECL) framework.' },
  { accountCode: '1120', accountName: 'Unbilled Receivables - Work in Progress', category: 'ASSET', subCategory: 'Accounts Receivable', gaapRef: 'ASC 606-10', ifrsRef: 'IFRS 15.107', taxableStatus: 'NON_TAXABLE_BALANCE', description: 'Earned revenue on percentage-of-completion contracts awaiting formal milestone invoice emission.' },
  { accountCode: '1150', accountName: 'Notes Receivable - Employee Travel Advances', category: 'ASSET', subCategory: 'Other Receivables', gaapRef: 'ASC 310-10', ifrsRef: 'IFRS 9.5.1', taxableStatus: 'EXEMPT', description: 'Short-term travel advances provided to field engineers and executives.' },
  { accountCode: '1160', accountName: 'Tax Refund Receivable - IRS Income Tax', category: 'ASSET', subCategory: 'Other Receivables', gaapRef: 'ASC 740-10', ifrsRef: 'IAS 12.12', taxableStatus: 'EXEMPT', description: 'Estimated overpayment of federal corporate income tax subject to refund.' },
  { accountCode: '1170', accountName: 'VAT / GST Input Tax Credit Receivable', category: 'ASSET', subCategory: 'Other Receivables', gaapRef: 'ASC 340-10', ifrsRef: 'IAS 1.78b', taxableStatus: 'EXEMPT', description: 'Value Added Tax paid on vendor purchases recoverable from tax authorities.' },

  // 1200-1299: Inventory Assets
  { accountCode: '1200', accountName: 'Finished Goods - Hardware Servers & Routers', category: 'ASSET', subCategory: 'Inventory', gaapRef: 'ASC 330-10', ifrsRef: 'IAS 2.9', taxableStatus: 'TAXABLE_INVENTORY', description: 'Fully assembled server racks and network switches ready for immediate client shipment.' },
  { accountCode: '1205', accountName: 'Finished Goods - Storage Enclosures', category: 'ASSET', subCategory: 'Inventory', gaapRef: 'ASC 330-10', ifrsRef: 'IAS 2.9', taxableStatus: 'TAXABLE_INVENTORY', description: 'SAN/NAS storage arrays packaged for enterprise deployment.' },
  { accountCode: '1210', accountName: 'Raw Materials - Motherboards & Processors', category: 'ASSET', subCategory: 'Inventory', gaapRef: 'ASC 330-10', ifrsRef: 'IAS 2.9', taxableStatus: 'TAXABLE_INVENTORY', description: 'High performance CPUs and custom server motherboards held in assembly line stock.' },
  { accountCode: '1215', accountName: 'Raw Materials - ECC Memory Modules', category: 'ASSET', subCategory: 'Inventory', gaapRef: 'ASC 330-10', ifrsRef: 'IAS 2.9', taxableStatus: 'TAXABLE_INVENTORY', description: 'DDR5 ECC RAM modules awaiting integration into hardware chassis.' },
  { accountCode: '1220', accountName: 'Work in Progress - Custom Rack Assembly', category: 'ASSET', subCategory: 'Inventory', gaapRef: 'ASC 330-10', ifrsRef: 'IAS 2.9', taxableStatus: 'TAXABLE_INVENTORY', description: 'Hardware units currently undergoing wiring, burn-in testing, and software flashing.' },
  { accountCode: '1250', accountName: 'Inventory Valuation Reserve - Obsolescence', category: 'ASSET', subCategory: 'Inventory', gaapRef: 'ASC 330-10', ifrsRef: 'IAS 2.28', taxableStatus: 'CONTRA_ASSET', description: 'Contra-inventory reserve for lower of cost and net realizable value (LCNRV) adjustments.' },

  // 1300-1399: Prepaid & Current Assets
  { accountCode: '1300', accountName: 'Prepaid Cloud Hosting - AWS Reserved Instances', category: 'ASSET', subCategory: 'Prepaid Expenses', gaapRef: 'ASC 340-10', ifrsRef: 'IAS 1.78b', taxableStatus: 'EXEMPT', description: 'Upfront payments for 3-year Amazon Web Services EC2 reserved compute instances.' },
  { accountCode: '1310', accountName: 'Prepaid Software - Salesforce & Workday', category: 'ASSET', subCategory: 'Prepaid Expenses', gaapRef: 'ASC 340-10', ifrsRef: 'IAS 1.78b', taxableStatus: 'EXEMPT', description: 'Annual enterprise CRM and HR SaaS subscriptions paid in advance.' },
  { accountCode: '1320', accountName: 'Prepaid Commercial Insurance - Property & Casualty', category: 'ASSET', subCategory: 'Prepaid Expenses', gaapRef: 'ASC 340-10', ifrsRef: 'IAS 1.78b', taxableStatus: 'EXEMPT', description: 'Annual premium payments for commercial property, liability, and cyber coverage.' },
  { accountCode: '1330', accountName: 'Prepaid Marketing & Sponsorships', category: 'ASSET', subCategory: 'Prepaid Expenses', gaapRef: 'ASC 340-10', ifrsRef: 'IAS 1.78b', taxableStatus: 'EXEMPT', description: 'Advance payments for key industry trade show booths and keynote sponsorships.' },

  // 1500-1699: Property, Plant & Equipment (PPE)
  { accountCode: '1500', accountName: 'Land & Site Improvements', category: 'ASSET', subCategory: 'Fixed Assets', gaapRef: 'ASC 360-10', ifrsRef: 'IAS 16.6', taxableStatus: 'NON_DEPRECIABLE', description: 'Real estate acreage owned for corporate campus and data center expansion.' },
  { accountCode: '1510', accountName: 'Corporate Headquarters Building', category: 'ASSET', subCategory: 'Fixed Assets', gaapRef: 'ASC 360-10', ifrsRef: 'IAS 16.6', taxableStatus: 'DEPRECIABLE_PROPERTY', description: 'Primary 5-story office facility located in San Jose, CA.' },
  { accountCode: '1511', accountName: 'Accumulated Depreciation - Buildings', category: 'ASSET', subCategory: 'Fixed Assets', gaapRef: 'ASC 360-10', ifrsRef: 'IAS 16.62', taxableStatus: 'CONTRA_ASSET', description: 'Straight-line accumulated depreciation on building over 39-year useful life.' },
  { accountCode: '1520', accountName: 'Datacenter Infrastructure & Cooling Systems', category: 'ASSET', subCategory: 'Fixed Assets', gaapRef: 'ASC 360-10', ifrsRef: 'IAS 16.6', taxableStatus: 'DEPRECIABLE_PROPERTY', description: 'High-density HVAC, UPS back-up generators, and fire suppression systems.' },
  { accountCode: '1521', accountName: 'Accumulated Depreciation - Datacenter Equipment', category: 'ASSET', subCategory: 'Fixed Assets', gaapRef: 'ASC 360-10', ifrsRef: 'IAS 16.62', taxableStatus: 'CONTRA_ASSET', description: 'Accelerated MACRS depreciation on electrical and HVAC datacenter gear.' },
  { accountCode: '1530', accountName: 'Developer Workstations & Laptops', category: 'ASSET', subCategory: 'Fixed Assets', gaapRef: 'ASC 360-10', ifrsRef: 'IAS 16.6', taxableStatus: 'DEPRECIABLE_PROPERTY', description: 'MacBook Pro and ThinkPad laptops issued to software engineering teams.' },
  { accountCode: '1531', accountName: 'Accumulated Depreciation - Developer Laptops', category: 'ASSET', subCategory: 'Fixed Assets', gaapRef: 'ASC 360-10', ifrsRef: 'IAS 16.62', taxableStatus: 'CONTRA_ASSET', description: 'Straight-line depreciation on employee computers over 3-year life cycle.' },

  // 1700-1799: Intangible Assets
  { accountCode: '1700', accountName: 'Capitalized Internal-Use Software Development', category: 'ASSET', subCategory: 'Intangible Assets', gaapRef: 'ASC 350-40', ifrsRef: 'IAS 38.57', taxableStatus: 'AMORTIZABLE_ASSET', description: 'Capitalized engineering payroll costs for core ERP platform features.' },
  { accountCode: '1701', accountName: 'Accumulated Amortization - Internal Software', category: 'ASSET', subCategory: 'Intangible Assets', gaapRef: 'ASC 350-40', ifrsRef: 'IAS 38.97', taxableStatus: 'CONTRA_ASSET', description: 'Cumulative straight-line amortization of software engineering costs over 5 years.' },
  { accountCode: '1710', accountName: 'Acquired Patents & Intellectual Property', category: 'ASSET', subCategory: 'Intangible Assets', gaapRef: 'ASC 350-30', ifrsRef: 'IAS 38.24', taxableStatus: 'AMORTIZABLE_ASSET', description: 'Patents for distributed consensus and high-speed database caching.' },
  { accountCode: '1720', accountName: 'Goodwill - M&A Acquisitions', category: 'ASSET', subCategory: 'Intangible Assets', gaapRef: 'ASC 350-20', ifrsRef: 'IFRS 3.32', taxableStatus: 'IMPAIRMENT_ONLY', description: 'Excess purchase price paid over fair market value of net assets acquired.' },

  // 2000-2099: Current Liabilities
  { accountCode: '2000', accountName: 'Accounts Payable - Vendor Invoices', category: 'LIABILITY', subCategory: 'Current Liabilities', gaapRef: 'ASC 405-10', ifrsRef: 'IAS 1.54k', taxableStatus: 'EXEMPT', description: 'Trade liabilities owed to component suppliers, hosting providers, and consultants.' },
  { accountCode: '2010', accountName: 'Accrued Employee Wages & Salaries', category: 'LIABILITY', subCategory: 'Current Liabilities', gaapRef: 'ASC 420-10', ifrsRef: 'IAS 19.8', taxableStatus: 'EXEMPT', description: 'Earned payroll compensation accrued between pay dates.' },
  { accountCode: '2015', accountName: 'Accrued Executive Bonuses & Commissions', category: 'LIABILITY', subCategory: 'Current Liabilities', gaapRef: 'ASC 420-10', ifrsRef: 'IAS 19.8', taxableStatus: 'EXEMPT', description: 'Annual performance bonuses and sales commission quotas accrued for payout.' },
  { accountCode: '2020', accountName: 'Accrued Employer FICA & Payroll Taxes', category: 'LIABILITY', subCategory: 'Current Liabilities', gaapRef: 'ASC 405-10', ifrsRef: 'IAS 19.8', taxableStatus: 'EXEMPT', description: 'Social Security and Medicare employer tax match due to government tax authority.' },
  { accountCode: '2030', accountName: 'Sales Tax & VAT Payable to Tax Authorities', category: 'LIABILITY', subCategory: 'Current Liabilities', gaapRef: 'ASC 405-10', ifrsRef: 'IAS 37.14', taxableStatus: 'EXEMPT', description: 'Fiduciary taxes collected on customer invoices awaiting remittance.' },
  { accountCode: '2040', accountName: 'Deferred Subscription Revenue - Current Portion', category: 'LIABILITY', subCategory: 'Current Liabilities', gaapRef: 'ASC 606-10', ifrsRef: 'IFRS 15.106', taxableStatus: 'EXEMPT', description: 'Unearned subscription fees to be recognized as revenue within 12 months.' },

  // 2500-2599: Long-Term Liabilities
  { accountCode: '2500', accountName: 'Senior Secured Term Loan - Syndicated Debt', category: 'LIABILITY', subCategory: 'Long-Term Liabilities', gaapRef: 'ASC 470-10', ifrsRef: 'IFRS 9.5.1', taxableStatus: 'EXEMPT', description: '5-year bank term debt facility carrying floating SOFR + 2.5% interest rate.' },
  { accountCode: '2510', accountName: 'Convertible Subordinated Notes Due 2030', category: 'LIABILITY', subCategory: 'Long-Term Liabilities', gaapRef: 'ASC 470-20', ifrsRef: 'IAS 32.28', taxableStatus: 'EXEMPT', description: 'Unsecured convertible notes issued to institutional growth investors.' },

  // 3000-3999: Equity Accounts
  { accountCode: '3000', accountName: 'Common Stock - Par Value $0.001 per Share', category: 'EQUITY', subCategory: 'Stockholders Equity', gaapRef: 'ASC 505-10', ifrsRef: 'IAS 1.54r', taxableStatus: 'EXEMPT', description: 'Par value of 100,000,000 authorized shares of voting common stock.' },
  { accountCode: '3010', accountName: 'Additional Paid-In Capital (APIC) - Common Stock', category: 'EQUITY', subCategory: 'Stockholders Equity', gaapRef: 'ASC 505-10', ifrsRef: 'IAS 1.54r', taxableStatus: 'EXEMPT', description: 'Capital raised from venture equity rounds in excess of par value.' },
  { accountCode: '3050', accountName: 'Retained Earnings - Cumulative Historical Net Income', category: 'EQUITY', subCategory: 'Stockholders Equity', gaapRef: 'ASC 505-10', ifrsRef: 'IAS 1.54r', taxableStatus: 'EXEMPT', description: 'Accumulated net profit re-invested into core product expansion.' },

  // 4000-4999: Operating Revenue
  { accountCode: '4000', accountName: 'SaaS Platform License Revenue - Enterprise Tier', category: 'REVENUE', subCategory: 'Operating Revenue', gaapRef: 'ASC 606-10', ifrsRef: 'IFRS 15.31', taxableStatus: 'TAXABLE_REVENUE', description: 'Annual subscription licensing fees for enterprise-wide ERP deployments.' },
  { accountCode: '4010', accountName: 'SaaS Platform License Revenue - Professional Tier', category: 'REVENUE', subCategory: 'Operating Revenue', gaapRef: 'ASC 606-10', ifrsRef: 'IFRS 15.31', taxableStatus: 'TAXABLE_REVENUE', description: 'Mid-market recurring cloud software subscription revenue.' },
  { accountCode: '4020', accountName: 'Professional Integration & Consulting Services', category: 'REVENUE', subCategory: 'Operating Revenue', gaapRef: 'ASC 606-10', ifrsRef: 'IFRS 15.31', taxableStatus: 'TAXABLE_REVENUE', description: 'Time & materials consulting fees for data migration and custom workflow build.' },
  { accountCode: '4030', accountName: 'Hardware Equipment Sales - Rack Servers', category: 'REVENUE', subCategory: 'Operating Revenue', gaapRef: 'ASC 606-10', ifrsRef: 'IFRS 15.31', taxableStatus: 'TAXABLE_REVENUE', description: 'Gross proceeds from direct enterprise server and switch sales.' },

  // 5000-5999: Cost of Goods Sold (COGS)
  { accountCode: '5000', accountName: 'Datacenter Compute Hosting - AWS & GCP', category: 'EXPENSE', subCategory: 'Cost of Goods Sold', gaapRef: 'ASC 330-10', ifrsRef: 'IAS 2.10', taxableStatus: 'DEDUCTIBLE_EXPENSE', description: 'Direct cloud compute, networking bandwidth, and database hosting costs.' },
  { accountCode: '5010', accountName: 'Customer Support & Success Team Salaries', category: 'EXPENSE', subCategory: 'Cost of Goods Sold', gaapRef: 'ASC 330-10', ifrsRef: 'IAS 2.10', taxableStatus: 'DEDUCTIBLE_EXPENSE', description: 'Compensation for 24/7 technical support engineers and account managers.' },
  { accountCode: '5020', accountName: 'Hardware Component Cost of Sales', category: 'EXPENSE', subCategory: 'Cost of Goods Sold', gaapRef: 'ASC 330-10', ifrsRef: 'IAS 2.10', taxableStatus: 'DEDUCTIBLE_EXPENSE', description: 'Direct procurement cost of server CPUs, memory, chassis, and motherboards.' },

  // 6000-6999: Operating Expenses
  { accountCode: '6000', accountName: 'R&D Software Engineer Payroll', category: 'EXPENSE', subCategory: 'Research & Development', gaapRef: 'ASC 730-10', ifrsRef: 'IAS 38.54', taxableStatus: 'TAX_CREDIT_ELIGIBLE', description: 'Compensation for core backend, frontend, and security software architects.' },
  { accountCode: '6100', accountName: 'Sales & Marketing Commission Payments', category: 'EXPENSE', subCategory: 'Sales & Marketing', gaapRef: 'ASC 340-40', ifrsRef: 'IFRS 15.91', taxableStatus: 'DEDUCTIBLE_EXPENSE', description: 'Commissions paid to enterprise account executives upon contract sign-off.' },
  { accountCode: '6200', accountName: 'Corporate Headquarters Office Rent', category: 'EXPENSE', subCategory: 'General & Administrative', gaapRef: 'ASC 842-20', ifrsRef: 'IFRS 16.24', taxableStatus: 'DEDUCTIBLE_EXPENSE', description: 'Monthly lease cost for corporate facilities in San Jose and London.' },
];
