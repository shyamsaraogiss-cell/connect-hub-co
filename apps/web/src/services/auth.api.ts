import { api } from "@/lib/api";
import { AuthUser, LoginInput } from "@/types/auth";

export const login = (input: LoginInput) => api<{ user: AuthUser }>("/auth/login", { method: "POST", body: JSON.stringify(input) });
export const logout = () => api<void>("/auth/logout", { method: "POST" });
export const getCurrentUser = () => api<{ user: AuthUser }>("/auth/me");
