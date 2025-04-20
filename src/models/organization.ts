export interface Organization {
  id: string;
  name: string;
  slug: string | null;
  description: string | null;
  plans: Plan[];
}

export interface Plan {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: string;
}
