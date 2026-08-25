import { User, UserRole } from '../core/models/user';
import { UUID } from '../core/models/types';
import { RBACEngine } from '../core/engine/rbacEngine';
import { PermissionFlag } from '../core/models/user';

export class UserService {
  private users: Map<UUID, User> = new Map();
  private rbacEngine: RBACEngine;

  constructor(initialUsers: User[] = []) {
    this.rbacEngine = new RBACEngine();
    initialUsers.forEach((u) => this.users.set(u.id, u));
  }

  public getAllUsers(): User[] {
    return Array.from(this.users.values());
  }

  public getUserById(id: UUID): User | undefined {
    return this.users.get(id);
  }

  public checkUserAccess(userId: UUID, resource: string, action: PermissionFlag): boolean {
    const user = this.getUserById(userId);
    if (!user) return false;
    return this.rbacEngine.hasPermission(user, resource, action);
  }
}
