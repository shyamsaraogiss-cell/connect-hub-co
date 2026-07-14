import { api } from "@/lib/api";
import { ReligiousPartner, ReligiousPartnerInput } from "@/types/partner";

const partnersEndpoint = "/partners";

export function getPartners(): Promise<ReligiousPartner[]> {
  return api<ReligiousPartner[]>(partnersEndpoint);
}

export function getPartner(id: string): Promise<ReligiousPartner> {
  return api<ReligiousPartner>(`${partnersEndpoint}/${id}`);
}

export function createPartner(partner: ReligiousPartnerInput): Promise<ReligiousPartner> {
  return api<ReligiousPartner>(partnersEndpoint, { method: "POST", body: JSON.stringify(partner) });
}

export function updatePartner(id: string, partner: Partial<ReligiousPartnerInput>): Promise<ReligiousPartner> {
  return api<ReligiousPartner>(`${partnersEndpoint}/${id}`, { method: "PATCH", body: JSON.stringify(partner) });
}

export function deactivatePartner(id: string): Promise<ReligiousPartner> {
  return api<ReligiousPartner>(`${partnersEndpoint}/${id}/deactivate`, { method: "PATCH" });
}
