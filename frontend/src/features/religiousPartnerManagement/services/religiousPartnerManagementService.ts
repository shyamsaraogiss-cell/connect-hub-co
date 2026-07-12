import { getAllReligiousPartners } from "../repositories/religiousPartnerManagementRepository";

export async function getReligiousPartners() {
  return getAllReligiousPartners();
}