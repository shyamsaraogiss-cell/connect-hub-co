export interface PitruMokshaRequest {
  id?: string;

  customerName: string;

  mobile: string;

  whatsapp?: string;

  email?: string;

  country?: string;

  state?: string;

  city?: string;

  serviceMode: string;

  ritualType: string;

  preferredDate?: string;

  preferredTime?: string;

  language?: string;

  samagriRequired: boolean;

  documentationRequired: boolean;

  travelAssistance: boolean;

  specialRequirements?: string;

  status?: string;

  quotationStatus?: string;

  assignedPartner?: string;

  founderRemarks?: string;
}