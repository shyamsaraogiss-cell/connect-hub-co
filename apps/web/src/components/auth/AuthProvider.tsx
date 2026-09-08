"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getCurrentUser, login as loginRequest, logout as logoutRequest } from "@/services/auth.api";
import { AuthUser, LoginInput } from "@/types/auth";

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  login: (input: LoginInput) => Promise<void>;
  logout: () => Promise<void>;
  register: (...args: unknown[]) => Promise<void>;
  forgotPassword: (...args: unknown[]) => Promise<{ message: string }>;
  resetPassword: (...args: unknown[]) => Promise<{ message: string }>;
  verifyEmail: (...args: unknown[]) => Promise<{ message: string }>;
  hasRole: (role: AuthUser["role"] | AuthUser["role"][]) => boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const isInternalERPRoute =
    pathname === "/dashboard" ||
    pathname.startsWith("/dashboard/") ||
    pathname === "/admin" ||
    pathname.startsWith("/admin/") ||
    pathname === "/customers" ||
    pathname.startsWith("/customers/") ||
    pathname === "/partners" ||
    pathname.startsWith("/partners/") ||
    pathname === "/bookings" ||
    pathname.startsWith("/bookings/") ||
    pathname === "/reports" ||
    pathname.startsWith("/reports/") ||
    pathname === "/pitru-moksha/requests" ||
    pathname === "/travel-assistance/requests";

  const isPublic = !isInternalERPRoute;

  useEffect(() => {
    let active = true;
    void getCurrentUser()
      .then(({ user: currentUser }) => { if (active) setUser(currentUser); })
      .catch(() => { if (active) setUser(null); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!loading && !user && !isPublic) router.replace("/login");
    if (!loading && user && pathname === "/login") router.replace("/");
  }, [isPublic, loading, pathname, router, user]);

  const login = useCallback(async (input: LoginInput) => {
    const response = await loginRequest(input);
    setUser(response.user);
    router.replace("/");
  }, [router]);

  const logout = useCallback(async () => {
    try { await logoutRequest(); }
    finally { setUser(null); router.replace("/login"); }
  }, [router]);

  const hasRole = useCallback((role: AuthUser["role"] | AuthUser["role"][]) => {
    if (Array.isArray(role)) return user ? role.includes(user.role) : false;
    return user?.role === role;
  }, [user]);

  const unsupportedAuthFlow = useCallback(async (): Promise<never> => {
    throw new Error('This authentication flow is unavailable during the current pre-trial phase.');
  }, []);

  const value = useMemo(() => ({
    user,
    loading,
    login,
    logout,
    hasRole,
    register: unsupportedAuthFlow,
    forgotPassword: unsupportedAuthFlow,
    resetPassword: unsupportedAuthFlow,
    verifyEmail: unsupportedAuthFlow,
  }), [hasRole, loading, login, logout, unsupportedAuthFlow, user]);

  const canRender = isPublic || (!loading && user);

  return <AuthContext.Provider value={value}>{canRender ? children : <main className="grid min-h-screen place-items-center">Checking your session...</main>}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth must be used inside AuthProvider.");
  return value;
}
