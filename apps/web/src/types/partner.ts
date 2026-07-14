export type PartnerType = "PANDIT" | "TEMPLE" | "ORGANIZATION";

export interface ReligiousPartner {
  id: string;
  name: string;
  partnerType: PartnerType;
  organization?: string | null;
  email?: string | null;
  phone?: string | null;
  city?: string | null;
  country?: string | null;
  verified: boolean;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export type ReligiousPartnerInput = Omit<ReligiousPartner, "id" | "createdAt" | "updatedAt">;
