import { apiRequest } from "@/lib/api";

const BASE = "/religious-partners";

export async function getReligiousPartners(
  token?: string
) {
  return apiRequest(
    BASE,
    "GET",
    undefined,
    token
  );
}

export async function getReligiousPartner(
  id: string,
  token?: string
) {
  return apiRequest(
    `${BASE}/${id}`,
    "GET",
    undefined,
    token
  );
}

export async function createReligiousPartner(
  data: any,
  token?: string
) {
  return apiRequest(
    BASE,
    "POST",
    data,
    token
  );
}

export async function updateReligiousPartner(
  id: string,
  data: any,
  token?: string
) {
  return apiRequest(
    `${BASE}/${id}`,
    "PUT",
    data,
    token
  );
}

export async function deleteReligiousPartner(
  id: string,
  token?: string
) {
  return apiRequest(
    `${BASE}/${id}`,
    "DELETE",
    undefined,
    token
  );
}