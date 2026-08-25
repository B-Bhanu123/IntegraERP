import './ui/styles/main.css';
import { generateSeedUsers, generateSeedProjects, generateSeedTasks, generateSeedAccounts } from './data/seedData';
import { ProjectService } from './services/projectService';
import { TaskService } from './services/taskService';
import { FinanceService } from './services/financeService';
import { HeaderComponent } from './ui/components/Header';
import { SidebarComponent } from './ui/components/Sidebar';
import { DashboardPage } from './ui/pages/DashboardPage';
import { FinancePage } from './ui/pages/FinancePage';

// Initialize services with seed data
const users = generateSeedUsers();
const projects = generateSeedProjects();
const tasks = generateSeedTasks();
const accounts = generateSeedAccounts();

const projectService = new ProjectService(projects);
const taskService = new TaskService(tasks);
const financeService = new FinanceService(accounts);

const header = new HeaderComponent();
const sidebar = new SidebarComponent();
const dashboardPage = new DashboardPage(projectService, taskService, financeService);
const financePage = new FinancePage(financeService);

let currentTab = 'dashboard';

function renderApp() {
  const appEl = document.getElementById('app');
  if (!appEl) return;

  let pageTitle = 'Executive Dashboard';
  let pageContent = '';

  if (currentTab === 'dashboard') {
    pageTitle = 'Executive Dashboard';
    pageContent = dashboardPage.render();
  } else if (currentTab === 'finance') {
    pageTitle = 'Financial Ledger & Accounting';
    pageContent = financePage.render();
  } else {
    pageTitle = currentTab.toUpperCase() + ' Management';
    pageContent = `
      <div class="glass-card">
        <h2 style="font-size: 1.25rem; font-weight: 700; color: #fff;">${pageTitle}</h2>
        <p style="margin-top: 1rem; color: var(--text-secondary);">Enterprise module online. Selected tab: <strong>${currentTab}</strong></p>
      </div>
    `;
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
  `;
}

// Global window routing helper
(window as any).switchTab = (tabId: string) => {
  currentTab = tabId;
  renderApp();
};

document.addEventListener('DOMContentLoaded', () => {
  renderApp();
});
