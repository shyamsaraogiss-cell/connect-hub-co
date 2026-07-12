const API_BASE_URL = "http://localhost:5000/api";

export async function apiRequest(
  endpoint: string,
  method: string,
  body?: any,
  token?: string
) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  return response.json();
}