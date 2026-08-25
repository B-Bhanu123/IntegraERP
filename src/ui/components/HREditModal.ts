import { Employee, EmploymentType } from '../../core/models/hr';

export class HREditModalComponent {
  public render(employee?: Employee): string {
    const isEdit = !!employee;
    const title = isEdit ? `Edit Employee: ${employee.employeeId}` : 'Add New Employee';

    return `
      <div class="modal-overlay" id="hrModal">
        <div class="modal-content">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.75rem;">
            <h3 style="font-size: 1.25rem; font-weight: 700; color: #fff;">${title}</h3>
            <button class="btn btn-secondary btn-sm" onclick="window.closeModal()">✕</button>
          </div>

          <form id="hrForm" onsubmit="window.saveEmployee(event, '${employee ? employee.id : ''}')">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
              <div class="form-group">
                <label>First Name</label>
                <input class="form-input" id="empFirst" type="text" required value="${employee ? employee.firstName : ''}" />
              </div>
              <div class="form-group">
                <label>Last Name</label>
                <input class="form-input" id="empLast" type="text" required value="${employee ? employee.lastName : ''}" />
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
              <div class="form-group">
                <label>Email</label>
                <input class="form-input" id="empEmail" type="email" required value="${employee ? employee.email : ''}" />
              </div>
              <div class="form-group">
                <label>Job Title</label>
                <input class="form-input" id="empTitle" type="text" required value="${employee ? employee.jobTitle : 'Software Engineer'}" />
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
              <div class="form-group">
                <label>Employment Type</label>
                <select class="form-select" id="empType">
                  <option value="FULL_TIME" ${employee?.employmentType === EmploymentType.FULL_TIME ? 'selected' : ''}>Full Time</option>
                  <option value="CONTRACT" ${employee?.employmentType === EmploymentType.CONTRACT ? 'selected' : ''}>Contract</option>
                  <option value="PART_TIME" ${employee?.employmentType === EmploymentType.PART_TIME ? 'selected' : ''}>Part Time</option>
                </select>
              </div>
              <div class="form-group">
                <label>Base Annual Salary ($)</label>
                <input class="form-input" id="empSalary" type="number" step="1000" value="${employee ? employee.baseSalary : 120000}" />
              </div>
            </div>

            <div style="display: flex; justify-content: flex-end; gap: 1rem; margin-top: 1.5rem;">
              <button type="button" class="btn btn-secondary" onclick="window.closeModal()">Cancel</button>
              <button type="submit" class="btn btn-primary">${isEdit ? 'Save Changes' : 'Add Employee'}</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }
}
