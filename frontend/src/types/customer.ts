export interface Customer {
  id: string;

  fullName: string;

  mobile: string;

  whatsapp?: string;

  email?: string;

  city?: string;

  state?: string;

  country?: string;

  purpose: string;

  serviceType?: string;

  status: string;

  assignedTo?: string;

  remarks?: string;

  createdAt: string;

  updatedAt: string;
}