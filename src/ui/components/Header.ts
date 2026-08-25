export class HeaderComponent {
  public render(title: string): string {
    return `
      <header class="header">
        <div class="header-title">${title}</div>
        <div style="display: flex; align-items: center; gap: 1rem;">
          <div class="badge badge-info">System Health: 100% Optimal</div>
          <div style="font-size: 0.875rem; color: var(--text-secondary);">
            Logged in as: <strong style="color: #fff;">bhanu-830 (SUPER_ADMIN)</strong>
          </div>
        </div>
      </header>
    `;
  }
}
