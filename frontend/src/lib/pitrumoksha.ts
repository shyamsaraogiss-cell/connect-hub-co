import { apiRequest } from "@/lib/api";

const BASE = "/pitrumoksha";

export async function getPitruRequests(
  token?: string
) {
  return apiRequest(
    BASE,
    "GET",
    undefined,
    token
  );
}

export async function getPitruRequest(
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

export async function createPitruRequest(
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

export async function updatePitruRequest(
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

export async function deletePitruRequest(
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