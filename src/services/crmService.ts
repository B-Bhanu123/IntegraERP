import { Customer, Lead, Opportunity } from '../core/models/crm';
import { UUID } from '../core/models/types';

export class CRMService {
  private customers: Map<UUID, Customer> = new Map();
  private leads: Map<UUID, Lead> = new Map();
  private opportunities: Map<UUID, Opportunity> = new Map();

  constructor(customers: Customer[] = [], leads: Lead[] = [], opportunities: Opportunity[] = []) {
    customers.forEach((c) => this.customers.set(c.id, c));
    leads.forEach((l) => this.leads.set(l.id, l));
    opportunities.forEach((o) => this.opportunities.set(o.id, o));
  }

  public getAllCustomers(): Customer[] {
    return Array.from(this.customers.values());
  }

  public getAllLeads(): Lead[] {
    return Array.from(this.leads.values());
  }

  public getAllOpportunities(): Opportunity[] {
    return Array.from(this.opportunities.values());
  }
}
