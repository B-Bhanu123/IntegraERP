// Enhanced Modal controller state handling for PR #4
import { Task, TaskState, TaskType } from '../../core/models/project';
import { PriorityLevel } from '../../core/models/types';

export class TaskEditModalComponent {
  public render(task?: Task): string {
    const isEdit = !!task;
    const title = isEdit ? `Edit Task: ${task.key}` : 'Create New Enterprise Task';

    return `
      <div class="modal-overlay" id="taskModal">
        <div class="modal-content">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.75rem;">
            <h3 style="font-size: 1.25rem; font-weight: 700; color: #fff;">${title}</h3>
            <button class="btn btn-secondary btn-sm" onclick="window.closeModal()">✕</button>
          </div>

          <form id="taskForm" onsubmit="window.saveTask(event, '${task ? task.id : ''}')">
            <div class="form-group">
              <label>Task Title</label>
              <input class="form-input" id="taskTitle" type="text" required value="${task ? task.title : ''}" placeholder="e.g. Implement Architecture Review Engine" />
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
              <div class="form-group">
                <label>Task Type</label>
                <select class="form-select" id="taskType">
                  <option value="FEATURE" ${task?.type === TaskType.FEATURE ? 'selected' : ''}>Feature</option>
                  <option value="BUG" ${task?.type === TaskType.BUG ? 'selected' : ''}>Bug Fix</option>
                  <option value="CHORE" ${task?.type === TaskType.CHORE ? 'selected' : ''}>Chore</option>
                  <option value="DOCUMENTATION" ${task?.type === TaskType.DOCUMENTATION ? 'selected' : ''}>Documentation</option>
                </select>
              </div>

              <div class="form-group">
                <label>Workflow State</label>
                <select class="form-select" id="taskState">
                  <option value="TODO" ${task?.state === TaskState.TODO ? 'selected' : ''}>To Do</option>
                  <option value="IN_PROGRESS" ${task?.state === TaskState.IN_PROGRESS ? 'selected' : ''}>In Progress</option>
                  <option value="IN_REVIEW" ${task?.state === TaskState.IN_REVIEW ? 'selected' : ''}>In Review</option>
                  <option value="DONE" ${task?.state === TaskState.DONE ? 'selected' : ''}>Done</option>
                </select>
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem;">
              <div class="form-group">
                <label>Priority</label>
                <select class="form-select" id="taskPriority">
                  <option value="LOW" ${task?.priority === PriorityLevel.LOW ? 'selected' : ''}>Low</option>
                  <option value="MEDIUM" ${task?.priority === PriorityLevel.MEDIUM ? 'selected' : ''}>Medium</option>
                  <option value="HIGH" ${task?.priority === PriorityLevel.HIGH ? 'selected' : ''}>High</option>
                  <option value="CRITICAL" ${task?.priority === PriorityLevel.CRITICAL ? 'selected' : ''}>Critical</option>
                </select>
              </div>

              <div class="form-group">
                <label>Estimated (Hours)</label>
                <input class="form-input" id="taskEstHours" type="number" min="1" max="500" value="${task ? task.estimatedHours : 16}" />
              </div>

              <div class="form-group">
                <label>Logged (Hours)</label>
                <input class="form-input" id="taskLoggedHours" type="number" min="0" max="500" value="${task ? task.loggedHours : 0}" />
              </div>
            </div>

            <div class="form-group">
              <label>Description</label>
              <textarea class="form-textarea" id="taskDesc" rows="3" placeholder="Enter detailed acceptance criteria...">${task ? task.description : ''}</textarea>
            </div>

            <div style="display: flex; justify-content: flex-end; gap: 1rem; margin-top: 1.5rem;">
              <button type="button" class="btn btn-secondary" onclick="window.closeModal()">Cancel</button>
              <button type="submit" class="btn btn-primary">${isEdit ? 'Save Changes' : 'Create Task'}</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }
}
