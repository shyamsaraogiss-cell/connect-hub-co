import { api, clearAccessToken, persistAccessToken } from "@/lib/api";
import { AuthUser, LoginInput, RegisterInput } from "@/types/auth";

interface BackendAuthUser {
  id: string;
  fullName: string;
  email: string;
  role: AuthUser["role"];
}

interface BackendLoginResponse {
  token: string;
  user: BackendAuthUser;
}

interface BackendRegisterResponse {
  success: boolean;
  message: string;
  user: BackendAuthUser;
}

export async function login(input: LoginInput): Promise<{ user: AuthUser }> {
  const response = await api<BackendLoginResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(input),
  });
  persistAccessToken(response.token);

  return {
    user: {
      id: response.user.id,
      name: response.user.fullName,
      email: response.user.email,
      role: response.user.role,
    },
  };
}

export async function register(input: RegisterInput): Promise<{ message: string }> {
  const response = await api<BackendRegisterResponse>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(input),
  });
  return { message: response.message };
}

export async function logout() {
  try {
    await api<void>("/api/auth/logout", { method: "POST" });
  } finally {
    clearAccessToken();
  }
}

export async function getCurrentUser(): Promise<{ user: AuthUser }> {
  const response = await api<{ user: BackendAuthUser }>("/api/auth/me");
  return {
    user: {
      id: response.user.id,
      name: response.user.fullName,
      email: response.user.email,
      role: response.user.role,
    },
  };
}
