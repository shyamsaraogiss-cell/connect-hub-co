import { api } from "@/lib/api";
import { ReligiousPartner, ReligiousPartnerInput, PartnerType } from "@/types/partner";

const partnersEndpoint = "/religious-partners";

interface BackendReligiousPartner {
  id: string;
  fullName: string;
  category: string;
  mobile: string;
  email?: string | null;
  city?: string | null;
  country?: string | null;
  identityVerified: boolean;
  addressVerified: boolean;
  qualificationVerified: boolean;
  status: string;
  remarks?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

type BackendEnvelope<T> = { data: T };

const normalize = (value: BackendReligiousPartner): ReligiousPartner => ({
  id: value.id,
  name: value.fullName,
  partnerType: value.category as PartnerType,
  organization: value.remarks,
  email: value.email,
  phone: value.mobile,
  city: value.city,
  country: value.country,
  verified: value.identityVerified,
  active: value.status === "Active",
  createdAt: value.createdAt,
  updatedAt: value.updatedAt,
});

const toBackend = (value: Partial<ReligiousPartnerInput>) => ({
  fullName: value.name,
  category: value.partnerType,
  mobile: value.phone,
  email: value.email,
  city: value.city,
  country: value.country,
  identityVerified: value.verified,
  status: value.active ? "Active" : "Inactive",
  remarks: value.organization,
});

export async function getPartners(): Promise<ReligiousPartner[]> {
  const data = await api<BackendEnvelope<BackendReligiousPartner[]>>(partnersEndpoint);
  return data.data.map(normalize);
}

export async function getPartner(id: string): Promise<ReligiousPartner> {
  const data = await api<BackendEnvelope<BackendReligiousPartner>>(`${partnersEndpoint}/${id}`);
  return normalize(data.data);
}

export async function createPartner(partner: ReligiousPartnerInput): Promise<ReligiousPartner> {
  const data = await api<BackendEnvelope<BackendReligiousPartner>>(partnersEndpoint, {
    method: "POST",
    body: JSON.stringify(toBackend(partner)),
  });
  return normalize(data.data);
}

export async function updatePartner(id: string, partner: Partial<ReligiousPartnerInput>): Promise<ReligiousPartner> {
  const data = await api<BackendEnvelope<BackendReligiousPartner>>(`${partnersEndpoint}/${id}`, {
    method: "PUT",
    body: JSON.stringify(toBackend(partner)),
  });
  return normalize(data.data);
}

export async function deactivatePartner(id: string): Promise<ReligiousPartner> {
  const data = await api<BackendEnvelope<BackendReligiousPartner>>(`${partnersEndpoint}/${id}/deactivate`, {
    method: "PATCH",
  });
  return normalize(data.data);
}
