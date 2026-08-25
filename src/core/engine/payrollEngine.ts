import { Employee } from '../models/hr';

export interface TaxBracket {
  min: number;
  max: number;
  rate: number;
}

export interface PayrollCalculationResult {
  employeeId: string;
  grossSalary: number;
  federalTax: number;
  stateTax: number;
  socialSecurity: number;
  medicare: number;
  totalTaxDeductions: number;
  healthInsuranceDeduction: number;
  retirementContribution: number;
  netSalary: number;
}

export class PayrollEngine {
  private taxBrackets: TaxBracket[] = [
    { min: 0, max: 10000, rate: 0.1 },
    { min: 10001, max: 40000, rate: 0.12 },
    { min: 40001, max: 85000, rate: 0.22 },
    { min: 85001, max: 163000, rate: 0.24 },
    { min: 163001, max: Infinity, rate: 0.32 },
  ];

  public calculatePayroll(employee: Employee, healthBenefitRate = 250, retirementPercent = 0.05): PayrollCalculationResult {
    const grossSalary = employee.baseSalary / 12; // Monthly gross

    // Calculate progressive income tax
    let federalTax = 0;
    const annualSalary = employee.baseSalary;

    for (const bracket of this.taxBrackets) {
      if (annualSalary > bracket.min) {
        const taxableInBracket = Math.min(annualSalary, bracket.max) - bracket.min;
        federalTax += taxableInBracket * bracket.rate;
      }
    }
    federalTax = federalTax / 12; // Monthly federal tax

    const stateTax = grossSalary * 0.05;
    const socialSecurity = grossSalary * 0.062;
    const medicare = grossSalary * 0.0145;

    const totalTaxDeductions = federalTax + stateTax + socialSecurity + medicare;
    const healthInsuranceDeduction = healthBenefitRate;
    const retirementContribution = grossSalary * retirementPercent;

    const netSalary = grossSalary - totalTaxDeductions - healthInsuranceDeduction - retirementContribution;

    return {
      employeeId: employee.id,
      grossSalary,
      federalTax,
      stateTax,
      socialSecurity,
      medicare,
      totalTaxDeductions,
      healthInsuranceDeduction,
      retirementContribution,
      netSalary,
    };
  }
}
