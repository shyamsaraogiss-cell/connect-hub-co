"use client";

import { usePathname } from "next/navigation";
import { useAuth } from "./AuthProvider";
import Link from "next/link";

export function SessionHeader() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  if (!user || pathname === "/login" || pathname === "/pitru-moksha" || pathname.startsWith("/pitru-moksha/success") || pathname === "/travel-assistance" || pathname.startsWith("/travel-assistance/success")) return null;

  return <header className="flex items-center justify-end gap-4 border-b bg-white px-8 py-3">
    <Link className="text-sm text-blue-700" href="/pitru-moksha/requests">PitruMoksha Requests</Link>
    <Link className="text-sm text-blue-700" href="/travel-assistance/requests">Travel Requests</Link>
    <span className="text-sm text-gray-700">{user.name} · {user.role}</span>
    <button className="rounded border px-3 py-1 text-sm" onClick={() => void logout()}>Logout</button>
  </header>;
}
