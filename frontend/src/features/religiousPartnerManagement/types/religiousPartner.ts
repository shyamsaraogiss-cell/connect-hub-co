export interface ReligiousPartner {
  id: string;

  fullName: string;

  category: string;

  mobile: string;

  whatsapp: string | null;

  email: string | null;

  city: string | null;

  state: string | null;

  country: string | null;

  preferredServiceArea: string | null;

  onlineAvailable: boolean;

  offlineAvailable: boolean;

  relocationAvailable: boolean;

  identityVerified: boolean;

  addressVerified: boolean;

  qualificationVerified: boolean;

  verificationDate: Date | null;

  status: string;

  remarks: string | null;

  createdAt: Date;

  updatedAt: Date;
}