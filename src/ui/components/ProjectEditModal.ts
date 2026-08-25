import { Project } from '../../core/models/project';
import { EntityStatus, PriorityLevel } from '../../core/models/types';

export class ProjectEditModalComponent {
  public render(project?: Project): string {
    const isEdit = !!project;
    const title = isEdit ? `Edit Project: ${project.code}` : 'Create New Enterprise Project';

    return `
      <div class="modal-overlay" id="projectModal">
        <div class="modal-content">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.75rem;">
            <h3 style="font-size: 1.25rem; font-weight: 700; color: #fff;">${title}</h3>
            <button class="btn btn-secondary btn-sm" onclick="window.closeModal()">✕</button>
          </div>

          <form id="projectForm" onsubmit="window.saveProject(event, '${project ? project.id : ''}')">
            <div class="form-group">
              <label>Project Name</label>
              <input class="form-input" id="projName" type="text" required value="${project ? project.name : ''}" placeholder="e.g. NextGen Core ERP Modernization" />
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
              <div class="form-group">
                <label>Status</label>
                <select class="form-select" id="projStatus">
                  <option value="IN_PROGRESS" ${project?.status === EntityStatus.IN_PROGRESS ? 'selected' : ''}>In Progress</option>
                  <option value="COMPLETED" ${project?.status === EntityStatus.COMPLETED ? 'selected' : ''}>Completed</option>
                  <option value="PENDING_APPROVAL" ${project?.status === EntityStatus.PENDING_APPROVAL ? 'selected' : ''}>Pending Approval</option>
                  <option value="SUSPENDED" ${project?.status === EntityStatus.SUSPENDED ? 'selected' : ''}>Suspended</option>
                </select>
              </div>

              <div class="form-group">
                <label>Priority</label>
                <select class="form-select" id="projPriority">
                  <option value="LOW" ${project?.priority === PriorityLevel.LOW ? 'selected' : ''}>Low</option>
                  <option value="MEDIUM" ${project?.priority === PriorityLevel.MEDIUM ? 'selected' : ''}>Medium</option>
                  <option value="HIGH" ${project?.priority === PriorityLevel.HIGH ? 'selected' : ''}>High</option>
                  <option value="CRITICAL" ${project?.priority === PriorityLevel.CRITICAL ? 'selected' : ''}>Critical</option>
                </select>
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
              <div class="form-group">
                <label>Allocated Budget ($)</label>
                <input class="form-input" id="projBudget" type="number" min="1000" value="${project ? project.budget.allocated.amount : 250000}" />
              </div>
              <div class="form-group">
                <label>Spent Budget ($)</label>
                <input class="form-input" id="projSpent" type="number" min="0" value="${project ? project.budget.spent.amount : 85000}" />
              </div>
            </div>

            <div class="form-group">
              <label>Description</label>
              <textarea class="form-textarea" id="projDesc" rows="3">${project ? project.description : ''}</textarea>
            </div>

            <div style="display: flex; justify-content: flex-end; gap: 1rem; margin-top: 1.5rem;">
              <button type="button" class="btn btn-secondary" onclick="window.closeModal()">Cancel</button>
              <button type="submit" class="btn btn-primary">${isEdit ? 'Save Changes' : 'Create Project'}</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }
}
