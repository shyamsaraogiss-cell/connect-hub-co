import { apiRequest } from "@/lib/api";

const BASE = "/customers";

export async function getCustomers(token?: string) {
  return apiRequest(
    BASE,
    "GET",
    undefined,
    token
  );
}

export async function getCustomer(
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

export async function createCustomer(
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

export async function updateCustomer(
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

export async function deleteCustomer(
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