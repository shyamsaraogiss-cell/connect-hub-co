export interface Customer {
  id: string;
  name: string;
  email?: string | null;
  phone?: string | null;
  country?: string | null;
  city?: string | null;
  isNRI: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export type CustomerInput = Omit<Customer, "id" | "createdAt" | "updatedAt">;
