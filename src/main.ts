import './ui/styles/main.css';
import { generateSeedUsers, generateSeedProjects, generateSeedTasks, generateSeedAccounts } from './data/seedData';
import { ENTERPRISE_PRODUCTS, ENTERPRISE_DEPARTMENTS } from './data/fixtures/largeDatasets';
import { ProjectService } from './services/projectService';
import { TaskService } from './services/taskService';
import { FinanceService } from './services/financeService';
import { InventoryService } from './services/inventoryService';
import { HRService } from './services/hrService';
import { CRMService } from './services/crmService';
import { ExportService } from './services/exportService';

import { HeaderComponent } from './ui/components/Header';
import { SidebarComponent } from './ui/components/Sidebar';
import { TaskEditModalComponent } from './ui/components/TaskEditModal';

import { DashboardPage } from './ui/pages/DashboardPage';
import { TasksPage } from './ui/pages/TasksPage';
import { FinancePage } from './ui/pages/FinancePage';
import { InventoryPage } from './ui/pages/InventoryPage';
import { HRPage } from './ui/pages/HRPage';
import { CRMPage } from './ui/pages/CRMPage';
import { AnalyticsPage } from './ui/pages/AnalyticsPage';

import { TaskState, TaskType, Task } from './core/models/project';
import { PriorityLevel } from './core/models/types';
import { Employee, EmploymentType } from './core/models/hr';
import { Customer } from './core/models/crm';

// Initialize services with seed data
const users = generateSeedUsers();
const projects = generateSeedProjects();
const tasks = generateSeedTasks();
const accounts = generateSeedAccounts();

const initialEmployees: Employee[] = [
  { id: 'emp_1', employeeId: 'EMP-001', firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@integraerp.internal', departmentId: 'dept_1', jobTitle: 'Principal Software Architect', employmentType: EmploymentType.FULL_TIME, hireDate: '2023-01-01', baseSalary: 145000, currency: 'USD', isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'emp_2', employeeId: 'EMP-002', firstName: 'Alex', lastName: 'Smith', email: 'alex.smith@integraerp.internal', departmentId: 'dept_2', jobTitle: 'Senior Cloud Engineer', employmentType: EmploymentType.FULL_TIME, hireDate: '2023-03-15', baseSalary: 125000, currency: 'USD', isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'emp_3', employeeId: 'EMP-003', firstName: 'Michael', lastName: 'Johnson', email: 'michael.j@integraerp.internal', departmentId: 'dept_3', jobTitle: 'Lead Product Manager', employmentType: EmploymentType.FULL_TIME, hireDate: '2022-06-10', baseSalary: 135000, currency: 'USD', isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'emp_4', employeeId: 'EMP-004', firstName: 'Sarah', lastName: 'Williams', email: 'sarah.w@integraerp.internal', departmentId: 'dept_4', jobTitle: 'Financial Controller', employmentType: EmploymentType.FULL_TIME, hireDate: '2021-11-20', baseSalary: 140000, currency: 'USD', isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
];

const initialCustomers: Customer[] = [
  { id: 'cust_1', customerCode: 'CUST-001', companyName: 'Acme Global Holdings', contactName: 'Robert Vance', email: 'vance@acmeglobal.com', phone: '+1 (555) 019-2834', billingAddress: '100 Enterprise Way, Austin TX', shippingAddress: '100 Enterprise Way, Austin TX', creditLimit: 500000, isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'cust_2', customerCode: 'CUST-002', companyName: 'Apex Cloud Solutions', contactName: 'Elena Rostova', email: 'elena@apexcloud.io', phone: '+1 (555) 014-9921', billingAddress: '450 Innovation Blvd, Seattle WA', shippingAddress: '450 Innovation Blvd, Seattle WA', creditLimit: 750000, isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
];

const projectService = new ProjectService(projects);
const taskService = new TaskService(tasks);
const financeService = new FinanceService(accounts);
const inventoryService = new InventoryService(ENTERPRISE_PRODUCTS);
const hrService = new HRService(initialEmployees);
const crmService = new CRMService(initialCustomers);

const header = new HeaderComponent();
const sidebar = new SidebarComponent();
const modalComponent = new TaskEditModalComponent();

const dashboardPage = new DashboardPage(projectService, taskService, financeService);
const tasksPage = new TasksPage(taskService);
const financePage = new FinancePage(financeService);
const inventoryPage = new InventoryPage(inventoryService);
const hrPage = new HRPage(hrService);
const crmPage = new CRMPage(crmService);
const analyticsPage = new AnalyticsPage(taskService, financeService);

let currentTab = 'dashboard';
let taskSearchQuery = '';
let activeModalHtml = '';

function renderApp() {
  const appEl = document.getElementById('app');
  if (!appEl) return;

  let pageTitle = 'Executive Dashboard';
  let pageContent = '';

  switch (currentTab) {
    case 'dashboard':
      pageTitle = 'Executive Dashboard';
      pageContent = dashboardPage.render();
      break;
    case 'tasks':
      pageTitle = 'Task & Workflow Management';
      pageContent = tasksPage.render(taskSearchQuery);
      break;
    case 'finance':
      pageTitle = 'Financial Ledger & Accounting';
      pageContent = financePage.render();
      break;
    case 'inventory':
      pageTitle = 'Supply Chain & Inventory';
      pageContent = inventoryPage.render();
      break;
    case 'hr':
      pageTitle = 'Human Resources & Payroll';
      pageContent = hrPage.render();
      break;
    case 'crm':
      pageTitle = 'CRM & Sales Funnel';
      pageContent = crmPage.render();
      break;
    case 'analytics':
      pageTitle = 'Intelligence & Reports';
      pageContent = analyticsPage.render();
      break;
    default:
      pageTitle = 'Dashboard';
      pageContent = dashboardPage.render();
  }

  appEl.innerHTML = `
    <div class="app-container">
      ${sidebar.render(currentTab)}
      <div class="main-content">
        ${header.render(pageTitle)}
        <div class="page-body">
          ${pageContent}
        </div>
      </div>
    </div>
    ${activeModalHtml}
  `;
}

// Global Window Event Handlers
(window as any).switchTab = (tabId: string) => {
  currentTab = tabId;
  activeModalHtml = '';
  renderApp();
};

(window as any).filterTasks = (query: string) => {
  taskSearchQuery = query;
  renderApp();
};

(window as any).openCreateTaskModal = () => {
  activeModalHtml = modalComponent.render();
  renderApp();
};

(window as any).openEditTaskModal = (taskId: string) => {
  const task = taskService.getTaskById(taskId);
  if (task) {
    activeModalHtml = modalComponent.render(task);
    renderApp();
  }
};

(window as any).closeModal = () => {
  activeModalHtml = '';
  renderApp();
};

(window as any).saveTask = (event: Event, taskId?: string) => {
  event.preventDefault();

  const titleInput = (document.getElementById('taskTitle') as HTMLInputElement).value;
  const typeInput = (document.getElementById('taskType') as HTMLSelectElement).value as TaskType;
  const stateInput = (document.getElementById('taskState') as HTMLSelectElement).value as TaskState;
  const priorityInput = (document.getElementById('taskPriority') as HTMLSelectElement).value as PriorityLevel;
  const estHoursInput = parseInt((document.getElementById('taskEstHours') as HTMLInputElement).value, 10) || 16;
  const loggedHoursInput = parseInt((document.getElementById('taskLoggedHours') as HTMLInputElement).value, 10) || 0;
  const descInput = (document.getElementById('taskDesc') as HTMLTextAreaElement).value;

  if (taskId) {
    // Edit existing task
    const existing = taskService.getTaskById(taskId);
    if (existing) {
      existing.title = titleInput;
      existing.type = typeInput;
      existing.state = stateInput;
      existing.priority = priorityInput;
      existing.estimatedHours = estHoursInput;
      existing.loggedHours = loggedHoursInput;
      existing.description = descInput;
      existing.updatedAt = new Date().toISOString();
    }
  } else {
    // Create new task
    taskService.createTask({
      key: `INT-${Math.floor(100 + Math.random() * 900)}`,
      projectId: 'proj_1',
      title: titleInput,
      description: descInput,
      type: typeInput,
      state: stateInput,
      priority: priorityInput,
      reporterId: 'user_1',
      estimatedHours: estHoursInput,
      loggedHours: loggedHoursInput,
      tags: ['Enterprise'],
      subtasks: [],
      dependencies: [],
    });
  }

  activeModalHtml = '';
  renderApp();
};

(window as any).downloadTaskJSON = () => {
  const data = taskService.getAllTasks();
  const jsonStr = ExportService.toJSON(data);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `integra_erp_tasks_${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

(window as any).downloadTaskCSV = () => {
  const data = taskService.getAllTasks().map((t) => ({
    Key: t.key,
    Title: t.title,
    Type: t.type,
    State: t.state,
    Priority: t.priority,
    EstimatedHours: t.estimatedHours,
    LoggedHours: t.loggedHours,
    CreatedAt: t.createdAt,
  }));
  const csvStr = ExportService.toCSV(data);
  const blob = new Blob([csvStr], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `integra_erp_tasks_${Date.now()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
};

document.addEventListener('DOMContentLoaded', () => {
  renderApp();
});
