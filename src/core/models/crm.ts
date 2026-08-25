import { BaseEntity, UUID, ISODateString, EntityStatus } from './types';

export enum LeadStatus {
  NEW = 'NEW',
  CONTACTED = 'CONTACTED',
  QUALIFIED = 'QUALIFIED',
  UNQUALIFIED = 'UNQUALIFIED',
  CONVERTED = 'CONVERTED',
}

export interface Customer extends BaseEntity {
  customerCode: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  billingAddress: string;
  shippingAddress: string;
  creditLimit: number;
  isActive: boolean;
}

export interface Lead extends BaseEntity {
  leadNumber: string;
  source: string;
  companyName: string;
  contactName: string;
  email: string;
  phone?: string;
  status: LeadStatus;
  estimatedValue: number;
  assignedToId?: UUID;
}

export interface Opportunity extends BaseEntity {
  opportunityNumber: string;
  title: string;
  customerId: UUID;
  stage: 'QUALIFICATION' | 'PROPOSAL' | 'NEGOTIATION' | 'CLOSED_WON' | 'CLOSED_LOST';
  expectedValue: number;
  probabilityPercentage: number;
  closeDate: ISODateString;
  ownerId: UUID;
}
