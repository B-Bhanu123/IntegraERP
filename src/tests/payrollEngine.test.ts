import { describe, it, expect } from 'vitest';
import { PayrollEngine } from '../core/engine/payrollEngine';
import { Employee, EmploymentType } from '../core/models/hr';

describe('PayrollEngine Tests', () => {
  const engine = new PayrollEngine();

  const employee: Employee = {
    id: 'emp_1',
    employeeId: 'EMP-001',
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@integraerp.internal',
    departmentId: 'dept_1',
    jobTitle: 'Principal Architect',
    employmentType: EmploymentType.FULL_TIME,
    hireDate: '2023-01-01',
    baseSalary: 120000, // $10,000/month gross
    currency: 'USD',
    isActive: true,
    createdAt: '',
    updatedAt: '',
  };

  it('should calculate gross monthly salary correctly', () => {
    const result = engine.calculatePayroll(employee);
    expect(result.grossSalary).toBe(10000);
  });

  it('should compute tax deductions and net salary properly', () => {
    const result = engine.calculatePayroll(employee, 250, 0.05);
    expect(result.socialSecurity).toBe(620); // 10000 * 0.062
    expect(result.medicare).toBe(145);       // 10000 * 0.0145
    expect(result.retirementContribution).toBe(500); // 10000 * 0.05
    expect(result.netSalary).toBeLessThan(10000);
  });
});
