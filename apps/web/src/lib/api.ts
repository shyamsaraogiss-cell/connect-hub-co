export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

// 5-second hard timeout: prevents a dead backend from holding
// Next.js worker threads open and causing page-level request timeouts.
const API_TIMEOUT_MS = 5000;
const AUTH_TOKEN_KEY = "connecthub_access_token";

export function persistAccessToken(token: string) {
  if (typeof window !== "undefined") localStorage.setItem(AUTH_TOKEN_KEY, token);
}

export function clearAccessToken() {
  if (typeof window !== "undefined") localStorage.removeItem(AUTH_TOKEN_KEY);
}

function getAccessToken(): string | null {
  return typeof window === "undefined" ? (process.env.TEST_AUTH_TOKEN || null) : localStorage.getItem(AUTH_TOKEN_KEY);
}

export async function api<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const hasBody = options?.body != null;
  const apiEndpoint = endpoint.startsWith("/api/") ? endpoint : `/api${endpoint}`;
  const token = getAccessToken();
  const response = await fetch(`${API_BASE_URL}${apiEndpoint}`, {
    credentials: "include",
    signal: AbortSignal.timeout(API_TIMEOUT_MS),
    headers: {
      // Only set Content-Type when a body is present.
      // Sending Content-Type: application/json with an empty body causes
      // some backends (including ours) to return 400.
      ...(hasBody ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options?.headers ?? {}),
    },
    ...options,
  });

  if (!response.ok) {
    if (response.status === 401) clearAccessToken();
    const body = await response.json().catch(() => null) as { message?: string } | null;
    throw new ApiError(body?.message ?? "API request failed.", response.status);
  }

  if (response.status === 204) return undefined as T;
  return response.json();
}

export class ApiError extends Error {
  constructor(message: string, public readonly status: number) {
    super(message);
    this.name = "ApiError";
  }
}
