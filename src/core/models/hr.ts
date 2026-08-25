import { BaseEntity, UUID, ISODateString, EntityStatus } from './types';

export enum EmploymentType {
  FULL_TIME = 'FULL_TIME',
  PART_TIME = 'PART_TIME',
  CONTRACT = 'CONTRACT',
  INTERN = 'INTERN',
}

export interface Department extends BaseEntity {
  code: string;
  name: string;
  managerId?: UUID;
  parentDepartmentId?: UUID;
  budgetAllocated: number;
}

export interface Employee extends BaseEntity {
  employeeId: string;
  userId?: UUID;
  firstName: string;
  lastName: string;
  email: string;
  departmentId: UUID;
  jobTitle: string;
  employmentType: EmploymentType;
  hireDate: ISODateString;
  baseSalary: number;
  currency: string;
  reportsToId?: UUID;
  isActive: boolean;
}

export interface PayrollRecord extends BaseEntity {
  payrollNumber: string;
  employeeId: UUID;
  periodStartDate: ISODateString;
  periodEndDate: ISODateString;
  grossSalary: number;
  taxDeductions: number;
  benefitsDeductions: number;
  netSalary: number;
  paymentDate: ISODateString;
  status: EntityStatus;
}
