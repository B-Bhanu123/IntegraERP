import { BaseEntity, UUID, ISODateString } from './types';

export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  EXECUTIVE = 'EXECUTIVE',
  PROJECT_MANAGER = 'PROJECT_MANAGER',
  FINANCE_MANAGER = 'FINANCE_MANAGER',
  INVENTORY_MANAGER = 'INVENTORY_MANAGER',
  HR_MANAGER = 'HR_MANAGER',
  SALES_MANAGER = 'SALES_MANAGER',
  CONTRIBUTOR = 'CONTRIBUTOR',
  AUDITOR = 'AUDITOR',
  GUEST = 'GUEST',
}

export enum PermissionFlag {
  READ = 'READ',
  WRITE = 'WRITE',
  DELETE = 'DELETE',
  APPROVE = 'APPROVE',
  EXPORT = 'EXPORT',
  ADMINISTER = 'ADMINISTER',
}

export interface Permission {
  id: UUID;
  resource: string; // e.g. 'project', 'finance', 'inventory', 'user'
  actions: PermissionFlag[];
}

export interface RoleDefinition extends BaseEntity {
  name: string;
  code: UserRole;
  description: string;
  permissions: Permission[];
  isCustom?: boolean;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  departmentId?: UUID;
  jobTitle?: string;
  phone?: string;
  timeZone: string;
  locale: string;
}

export interface SecurityPreferences {
  twoFactorEnabled: boolean;
  sessionTimeoutMinutes: number;
  ipWhitelist?: string[];
  passwordLastChanged: ISODateString;
}

export interface User extends BaseEntity {
  username: string;
  email: string;
  passwordHash?: string;
  role: UserRole;
  profile: UserProfile;
  security: SecurityPreferences;
  isActive: boolean;
  lastLoginAt?: ISODateString;
}

export interface AuthToken {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: 'Bearer';
  user: Omit<User, 'passwordHash'>;
}

export interface LoginHistoryEntry {
  id: UUID;
  userId: UUID;
  timestamp: ISODateString;
  ipAddress: string;
  userAgent: string;
  success: boolean;
  failureReason?: string;
}
