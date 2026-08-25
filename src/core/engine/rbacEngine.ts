import { UserRole, PermissionFlag, User } from '../models/user';

export class RBACEngine {
  private roleHierarchy: Map<UserRole, UserRole[]> = new Map();

  constructor() {
    this.setupHierarchy();
  }

  private setupHierarchy(): void {
    this.roleHierarchy.set(UserRole.SUPER_ADMIN, [
      UserRole.ADMIN,
      UserRole.EXECUTIVE,
      UserRole.PROJECT_MANAGER,
      UserRole.FINANCE_MANAGER,
      UserRole.INVENTORY_MANAGER,
      UserRole.HR_MANAGER,
      UserRole.SALES_MANAGER,
      UserRole.CONTRIBUTOR,
      UserRole.AUDITOR,
      UserRole.GUEST,
    ]);

    this.roleHierarchy.set(UserRole.ADMIN, [
      UserRole.PROJECT_MANAGER,
      UserRole.FINANCE_MANAGER,
      UserRole.INVENTORY_MANAGER,
      UserRole.HR_MANAGER,
      UserRole.SALES_MANAGER,
      UserRole.CONTRIBUTOR,
      UserRole.AUDITOR,
      UserRole.GUEST,
    ]);

    this.roleHierarchy.set(UserRole.PROJECT_MANAGER, [UserRole.CONTRIBUTOR, UserRole.GUEST]);
    this.roleHierarchy.set(UserRole.FINANCE_MANAGER, [UserRole.AUDITOR, UserRole.GUEST]);
    this.roleHierarchy.set(UserRole.INVENTORY_MANAGER, [UserRole.GUEST]);
    this.roleHierarchy.set(UserRole.HR_MANAGER, [UserRole.GUEST]);
    this.roleHierarchy.set(UserRole.SALES_MANAGER, [UserRole.GUEST]);
    this.roleHierarchy.set(UserRole.CONTRIBUTOR, [UserRole.GUEST]);
    this.roleHierarchy.set(UserRole.AUDITOR, [UserRole.GUEST]);
    this.roleHierarchy.set(UserRole.GUEST, []);
  }

  public isSuperUser(role: UserRole): boolean {
    return role === UserRole.SUPER_ADMIN || role === UserRole.ADMIN;
  }

  public hasPermission(user: User, resource: string, action: PermissionFlag): boolean {
    if (!user.isActive) {
      return false;
    }

    if (this.isSuperUser(user.role)) {
      return true;
    }

    // Role-specific rule evaluation
    switch (user.role) {
      case UserRole.PROJECT_MANAGER:
        if (resource === 'project' || resource === 'task') {
          return true;
        }
        if (resource === 'finance' && action === PermissionFlag.READ) {
          return true;
        }
        break;

      case UserRole.FINANCE_MANAGER:
        if (resource === 'finance' || resource === 'invoice' || resource === 'payment') {
          return true;
        }
        break;

      case UserRole.INVENTORY_MANAGER:
        if (resource === 'inventory' || resource === 'warehouse' || resource === 'product') {
          return true;
        }
        break;

      case UserRole.HR_MANAGER:
        if (resource === 'hr' || resource === 'employee' || resource === 'payroll') {
          return true;
        }
        break;

      case UserRole.SALES_MANAGER:
        if (resource === 'crm' || resource === 'lead' || resource === 'opportunity') {
          return true;
        }
        break;

      case UserRole.CONTRIBUTOR:
        if ((resource === 'task' || resource === 'time_entry') && (action === PermissionFlag.READ || action === PermissionFlag.WRITE)) {
          return true;
        }
        break;

      case UserRole.AUDITOR:
        if (action === PermissionFlag.READ || action === PermissionFlag.EXPORT) {
          return true;
        }
        break;

      case UserRole.GUEST:
        if (action === PermissionFlag.READ && resource === 'public') {
          return true;
        }
        break;
    }

    return false;
  }
}
