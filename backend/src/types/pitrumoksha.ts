export interface CreatePitruMokshaDTO {

  customerName: string;

  mobile: string;

  whatsapp?: string;

  email?: string;

  country?: string;

  state?: string;

  city?: string;

  serviceMode: string;

  ritualType: string;

  preferredDate?: Date;

  preferredTime?: string;

  language?: string;

  samagriRequired?: boolean;

  documentationRequired?: boolean;

  travelAssistance?: boolean;

  specialRequirements?: string;

  status?: string;

  quotationStatus?: string;

  assignedPartner?: string;

  founderRemarks?: string;

}

export interface UpdatePitruMokshaDTO
  extends Partial<CreatePitruMokshaDTO> {}