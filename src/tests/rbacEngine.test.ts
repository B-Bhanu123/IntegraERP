import { describe, it, expect } from 'vitest';
import { RBACEngine } from '../core/engine/rbacEngine';
import { User, UserRole, PermissionFlag } from '../core/models/user';

describe('RBACEngine Tests', () => {
  const engine = new RBACEngine();

  const superAdminUser: User = {
    id: 'admin_1',
    username: 'admin',
    email: 'admin@integraerp.internal',
    role: UserRole.SUPER_ADMIN,
    profile: { firstName: 'Admin', lastName: 'User', timeZone: 'UTC', locale: 'en-US' },
    security: { twoFactorEnabled: true, sessionTimeoutMinutes: 30, passwordLastChanged: new Date().toISOString() },
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const contributorUser: User = {
    ...superAdminUser,
    id: 'user_2',
    role: UserRole.CONTRIBUTOR,
  };

  it('should grant SUPER_ADMIN full access to all resources', () => {
    expect(engine.hasPermission(superAdminUser, 'finance', PermissionFlag.DELETE)).toBe(true);
    expect(engine.hasPermission(superAdminUser, 'system', PermissionFlag.ADMINISTER)).toBe(true);
  });

  it('should deny CONTRIBUTOR access to administrative finance deletion', () => {
    expect(engine.hasPermission(contributorUser, 'finance', PermissionFlag.DELETE)).toBe(false);
  });

  it('should allow CONTRIBUTOR to read and write tasks', () => {
    expect(engine.hasPermission(contributorUser, 'task', PermissionFlag.READ)).toBe(true);
    expect(engine.hasPermission(contributorUser, 'task', PermissionFlag.WRITE)).toBe(true);
  });
});
