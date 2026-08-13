export interface Customer {
  id: string;
  name: string;
  email?: string | null;
  phone?: string | null;
  country?: string | null;
  city?: string | null;
  purpose: string;
  serviceType?: string | null;
  status: string;
  createdAt?: string;
  updatedAt?: string;
}

export type CustomerInput = Omit<Customer, "id" | "createdAt" | "updatedAt" | "status"> & { status?: string };
