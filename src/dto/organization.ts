import { Organization } from 'src/models/organization'
import currency from 'currency.js'

export interface OrganizationResponse {
  id: string;
  name: string;
  slug: string | null;
  description: string | null;
  plans: PlanResponse[];
}

export interface PlanResponse {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: string;
}

export function mapOrganization(dto: OrganizationResponse): Organization {
  return {
    ...dto,
    plans: dto.plans.map(p => ({
      ...p,
      price: currency(p.price)
    }))
  }
}
