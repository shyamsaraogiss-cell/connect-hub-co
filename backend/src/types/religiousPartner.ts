export interface CreateReligiousPartnerDTO {

  fullName: string;

  category: string;

  mobile: string;

  whatsapp?: string;

  email?: string;

  city?: string;

  state?: string;

  country?: string;

  preferredServiceArea?: string;

  onlineAvailable?: boolean;

  offlineAvailable?: boolean;

  relocationAvailable?: boolean;

}

export interface UpdateReligiousPartnerDTO extends Partial<CreateReligiousPartnerDTO> {
  identityVerified?: boolean;
  addressVerified?: boolean;
  qualificationVerified?: boolean;
  verificationDate?: Date | null;
  status?: string;
  remarks?: string | null;
}
