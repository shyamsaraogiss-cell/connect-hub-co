export interface CreateCustomerDTO {
  fullName: string;
  mobile: string;

  whatsapp?: string;
  email?: string;

  city?: string;
  state?: string;
  country?: string;

  purpose: string;
  serviceType?: string;

  status?: string;
  assignedTo?: string;

  remarks?: string;
}

export interface UpdateCustomerDTO {
  fullName?: string;
  mobile?: string;

  whatsapp?: string;
  email?: string;

  city?: string;
  state?: string;
  country?: string;

  purpose?: string;
  serviceType?: string;

  status?: string;
  assignedTo?: string;

  remarks?: string;
}