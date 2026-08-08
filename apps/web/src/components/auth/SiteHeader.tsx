"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "./AuthProvider";

export function SiteHeader() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const isPublic = ["/", "/about", "/contact", "/login", "/pitru-moksha", "/travel-assistance", "/services"].includes(pathname) || pathname.startsWith("/services/") || pathname.endsWith("/success");
  if (isPublic) return <header className="sticky top-0 z-50 border-b bg-white/95 px-4 py-3 shadow-sm backdrop-blur sm:px-8"><nav aria-label="Main navigation" className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-5 gap-y-3"><Link className="mr-auto flex items-center gap-2 font-bold text-orange-900" href="/"><span aria-hidden className="grid h-9 w-9 place-items-center rounded-full bg-orange-800 text-lg text-white">ॐ</span><span>Connect Hub Co</span></Link><Link href="/about">About</Link><Link href="/services">Services</Link><Link href="/pitru-moksha">Pitru Moksha</Link><Link href="/travel-assistance">Travel</Link><Link href="/contact">Contact</Link>{user ? <Link className="rounded-lg bg-blue-700 px-3 py-2 text-white" href="/dashboard">Dashboard</Link> : <Link className="rounded-lg bg-blue-700 px-3 py-2 text-white" href="/login">Login</Link>}</nav></header>;
  if (!user) return null;
  return <header className="sticky top-0 z-50 border-b bg-white px-4 py-3 shadow-sm sm:px-8"><nav aria-label="ERP navigation" className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-4 gap-y-3"><Link className="mr-auto font-bold text-blue-900" href="/dashboard">Connect Hub ERP</Link><Link href="/partners">Partners</Link><Link href="/customers">Customers</Link><Link href="/bookings">Bookings</Link><Link href="/admin/services">Services</Link><Link href="/requests">Requests</Link><Link href="/reports">Reports</Link><span className="text-sm text-gray-600">{user.name} · {user.role}</span><button className="rounded border px-3 py-1 text-sm hover:bg-gray-100" onClick={() => void logout()}>Logout</button></nav></header>;
}
