export type UserRole = "FOUNDER" | "ADMIN" | "CUSTOMER" | "RELIGIOUS_PARTNER";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface LoginInput {
  email: string;
  password: string;
}
