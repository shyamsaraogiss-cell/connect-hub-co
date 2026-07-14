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
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const isPublic = pathname === "/login" || pathname === "/pitru-moksha" || pathname.startsWith("/pitru-moksha/success") || pathname === "/travel-assistance" || pathname.startsWith("/travel-assistance/success");

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

  const value = useMemo(() => ({ user, loading, login, logout }), [loading, login, logout, user]);
  const canRender = isPublic || (!loading && user);

  return <AuthContext.Provider value={value}>{canRender ? children : <main className="grid min-h-screen place-items-center">Checking your session...</main>}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth must be used inside AuthProvider.");
  return value;
}
