/**
 * IntegraERP Large Enterprise Dataset Registry
 * Pre-populated enterprise fixtures for benchmarking, stress testing, and demonstration.
 */

import { Product, Warehouse, ProductCategory } from '../../core/models/inventory';
import { Department, Employee, EmploymentType } from '../../core/models/hr';
import { Customer, Lead, LeadStatus } from '../../core/models/crm';

export const ENTERPRISE_DEPARTMENTS: Department[] = [
  { id: 'dept_1', code: 'EXEC', name: 'Executive Leadership', managerId: 'emp_1', budgetAllocated: 2500000, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'dept_2', code: 'ENG', name: 'Software Engineering & Cloud Ops', managerId: 'emp_2', budgetAllocated: 8500000, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'dept_3', code: 'PROD', name: 'Product Management & UX Design', managerId: 'emp_3', budgetAllocated: 3200000, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'dept_4', code: 'FIN', name: 'Corporate Finance & Accounting', managerId: 'emp_4', budgetAllocated: 2100000, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'dept_5', code: 'SCM', name: 'Supply Chain & Warehouse Logistics', managerId: 'emp_5', budgetAllocated: 4100000, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'dept_6', code: 'HR', name: 'Human Resources & Talent Acquisition', managerId: 'emp_6', budgetAllocated: 1800000, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'dept_7', code: 'SALES', name: 'Global Enterprise Sales', managerId: 'emp_7', budgetAllocated: 6200000, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'dept_8', code: 'LEGAL', name: 'Legal Counsel & Governance', managerId: 'emp_8', budgetAllocated: 1400000, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
];

export const ENTERPRISE_WAREHOUSES: Warehouse[] = [
  { id: 'wh_1', code: 'WH-US-WEST', name: 'Americas West Coast Logistics Node', address: '100 Innovation Way', city: 'San Jose', country: 'United States', capacityUnits: 150000, isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'wh_2', code: 'WH-US-EAST', name: 'Americas East Coast Distribution Hub', address: '500 Harbor Boulevard', city: 'Newark', country: 'United States', capacityUnits: 200000, isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'wh_3', code: 'WH-EU-CENTRAL', name: 'EMEA Central Gateway', address: 'Logistikplatz 1', city: 'Frankfurt', country: 'Germany', capacityUnits: 180000, isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'wh_4', code: 'WH-APAC-SING', name: 'APAC Regional Logistics Terminal', address: '12 Changi South Street', city: 'Singapore', country: 'Singapore', capacityUnits: 120000, isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
];

export const ENTERPRISE_PRODUCTS: Product[] = [
  { id: 'prod_1', sku: 'HW-SRV-001', name: 'IntegraRack Dual-Socket Enterprise Server', description: '2U Rackmount Server with 64-core processor and 512GB ECC RAM', category: ProductCategory.HARDWARE, unitPrice: 8500.0, costPrice: 5200.0, unitOfMeasure: 'UNIT', reorderPoint: 15, reorderQuantity: 30, isBatchTracked: true, isSerialTracked: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'prod_2', sku: 'HW-NET-002', name: 'IntegraSwitch 48-Port 100GbE Managed Switch', description: 'High density datacenter switch with ultra-low latency', category: ProductCategory.HARDWARE, unitPrice: 4200.0, costPrice: 2400.0, unitOfMeasure: 'UNIT', reorderPoint: 20, reorderQuantity: 40, isBatchTracked: false, isSerialTracked: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'prod_3', sku: 'SW-LIC-003', name: 'IntegraERP Core Suite Annual License', description: 'Enterprise tier license for up to 500 active concurrent users', category: ProductCategory.SOFTWARE, unitPrice: 45000.0, costPrice: 5000.0, unitOfMeasure: 'LICENSE', reorderPoint: 0, reorderQuantity: 0, isBatchTracked: false, isSerialTracked: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'prod_4', sku: 'SW-AI-004', name: 'IntegraAnalytics Predictive Intelligence Add-on', description: 'Machine learning add-on module for inventory forecasting', category: ProductCategory.SOFTWARE, unitPrice: 15000.0, costPrice: 1500.0, unitOfMeasure: 'LICENSE', reorderPoint: 0, reorderQuantity: 0, isBatchTracked: false, isSerialTracked: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'prod_5', sku: 'SRV-CON-005', name: 'On-Site Enterprise Implementation Consulting (Per Day)', description: 'Senior architect consulting for custom ERP integration', category: ProductCategory.SERVICES, unitPrice: 2800.0, costPrice: 1200.0, unitOfMeasure: 'DAY', reorderPoint: 0, reorderQuantity: 0, isBatchTracked: false, isSerialTracked: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
];
