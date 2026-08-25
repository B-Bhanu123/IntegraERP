import { Employee, PayrollRecord } from '../core/models/hr';
import { PayrollEngine, PayrollCalculationResult } from '../core/engine/payrollEngine';
import { UUID } from '../core/models/types';

export class HRService {
  private employees: Map<UUID, Employee> = new Map();
  private payrollEngine: PayrollEngine;

  constructor(initialEmployees: Employee[] = []) {
    this.payrollEngine = new PayrollEngine();
    initialEmployees.forEach((e) => this.employees.set(e.id, e));
  }

  public getAllEmployees(): Employee[] {
    return Array.from(this.employees.values());
  }

  public calculateMonthlyPayroll(employeeId: UUID): PayrollCalculationResult {
    const emp = this.employees.get(employeeId);
    if (!emp) {
      throw new Error(`Employee ${employeeId} not found.`);
    }

    return this.payrollEngine.calculatePayroll(emp);
  }
}
