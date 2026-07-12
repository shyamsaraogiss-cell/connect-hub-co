export interface ReligiousPartner {
  id?: string;

  fullName: string;

  category: string;

  mobile: string;

  whatsapp?: string;

  email?: string;

  city?: string;

  state?: string;

  country?: string;

  preferredServiceArea?: string;

  onlineAvailable: boolean;

  offlineAvailable: boolean;

  relocationAvailable: boolean;

  identityVerified: boolean;

  addressVerified: boolean;

  qualificationVerified: boolean;

  verificationDate?: string;

  status: string;

  remarks?: string;

  createdAt?: string;

  updatedAt?: string;
}