export class SidebarComponent {
  public render(activeTab = 'dashboard'): string {
    const navItems = [
      { id: 'dashboard', label: 'Executive Dashboard', icon: '📊' },
      { id: 'tasks', label: 'Task & Workflows', icon: '⚡' },
      { id: 'finance', label: 'Financial Ledger', icon: '💎' },
      { id: 'inventory', label: 'Supply Chain & Stock', icon: '📦' },
      { id: 'hr', label: 'Human Resources', icon: '👥' },
      { id: 'crm', label: 'CRM Sales Funnel', icon: '🎯' },
      { id: 'analytics', label: 'Intelligence & Reports', icon: '📈' },
    ];

    return `
      <aside class="sidebar">
        <div class="sidebar-logo">
          <span>IntegraERP</span>
        </div>
        <nav style="flex: 1;">
          ${navItems
            .map(
              (item) => `
            <div class="nav-item ${activeTab === item.id ? 'active' : ''}" onclick="window.switchTab('${item.id}')">
              <span>${item.icon}</span>
              <span>${item.label}</span>
            </div>
          `
            )
            .join('')}
        </nav>
        <div style="font-size: 0.75rem; color: var(--text-muted); text-align: center; border-top: 1px solid var(--border-color); padding-top: 1rem;">
          IntegraERP v1.0.0 (Enterprise)
        </div>
      </aside>
    `;
  }
}
