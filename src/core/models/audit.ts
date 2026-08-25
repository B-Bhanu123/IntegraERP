import { BaseEntity, UUID, ISODateString } from './types';

export enum AuditSeverity {
  INFO = 'INFO',
  WARNING = 'WARNING',
  SECURITY_ALERT = 'SECURITY_ALERT',
  CRITICAL_ERROR = 'CRITICAL_ERROR',
}

export interface AuditLogEntry extends BaseEntity {
  action: string; // e.g., 'USER_LOGIN', 'TASK_STATE_CHANGE', 'INVOICE_APPROVED'
  resource: string;
  resourceId?: UUID;
  performedBy: UUID;
  userEmail: string;
  ipAddress: string;
  userAgent?: string;
  severity: AuditSeverity;
  changes?: {
    before?: Record<string, unknown>;
    after?: Record<string, unknown>;
  };
  details?: string;
}

export interface SystemMetricSnapshot {
  timestamp: ISODateString;
  cpuUsagePercentage: number;
  memoryUsageMb: number;
  activeSessions: number;
  databaseQueryLatencyMs: number;
  httpRequestsPerMinute: number;
}
