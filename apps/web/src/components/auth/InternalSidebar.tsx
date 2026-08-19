"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { useAuth } from "./AuthProvider";
import { KHEM_EXACT_SIDEBAR_HIERARCHY } from "@/config/khem-navigation.config";

import { SessionHeader } from "./SessionHeader";

const sidebarItems = KHEM_EXACT_SIDEBAR_HIERARCHY;

export function InternalSidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const visible = useMemo(
    () => sidebarItems.filter((item) => item.label.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  const sidebar = (
    <aside className="flex h-full flex-col bg-[#201a17] text-stone-200">
      {/* Brand Header */}
      <div className="border-b border-stone-700 p-5">
        <Link href="/dashboard" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-orange-700 text-xl" aria-hidden>
            ॐ
          </span>
          <span>
            <strong className="block text-white font-serif">Connect Hub Co</strong>
            <span className="text-xs text-stone-400">Operations workspace</span>
          </span>
        </Link>
      </div>

      {/* Menu Search Input */}
      <div className="p-4">
        <label className="relative block">
          <span className="sr-only">Search navigation</span>
          <span className="absolute left-3 top-2.5 text-stone-500" aria-hidden>
            ⌕
          </span>
          <input
            className="w-full rounded-lg border border-stone-700 bg-stone-900 py-2 pl-9 pr-3 text-sm text-white outline-none focus:border-orange-500"
            placeholder="Search menu"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
      </div>

      {/* Flat Hierarchical Sidebar Navigation without Category Headings */}
      <nav className="flex-1 overflow-y-auto px-3 pb-5" aria-label="ERP sidebar">
        <div className="grid gap-1">
          {visible.map((item) => {
            const active = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(`${item.href}/`));
            return (
              <div key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                     item.isChild ? "ml-4 text-stone-300 text-xs border-l border-stone-700 pl-3" : ""
                  } ${
                    active ? "bg-orange-700 font-semibold text-white" : "hover:bg-stone-800 hover:text-white"
                  }`}
                >
                  <span className="w-5 text-center" aria-hidden>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </Link>
                {/* Clear visual spacing / divider after Religious Partner Registration */}
                {item.isDividerAfter ? (
                  <div className="my-3 border-t border-stone-700/80" aria-hidden="true" />
                ) : null}
              </div>
            );
          })}
        </div>
      </nav>

      {/* Zen G AI Quick Launcher & User Badge */}
      <div className="border-t border-stone-700 p-4">
        <Link href="/zen-g" className="mb-4 block rounded-xl border border-orange-700/60 bg-orange-950/40 p-3">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-400">Ask GenZ AI</span>
          <span className="mt-1 block text-sm">Open guidance assistant</span>
        </Link>
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-stone-700 font-bold">
            {user?.name?.charAt(0).toUpperCase()}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-white">{user?.name}</p>
            <p className="text-xs text-stone-500">{user?.role}</p>
          </div>
          <button className="rounded border border-stone-600 px-2 py-1 text-xs" onClick={() => void logout()}>
            Logout
          </button>
        </div>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-gray-100 lg:grid lg:grid-cols-[280px_minmax(0,1fr)]">
      {/* Mobile Top Bar */}
      <div className="sticky top-0 z-40 flex items-center border-b bg-[#201a17] px-4 py-3 text-white lg:hidden">
        <button className="rounded border border-stone-600 px-3 py-2" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
          {open ? "Close" : "Menu"}
        </button>
        <Link className="ml-4 font-bold" href="/dashboard">
          Connect Hub ERP
        </Link>
        <Link className="ml-auto rounded bg-orange-700 px-3 py-2 text-sm" href="/zen-g">
          Ask GenZ AI
        </Link>
      </div>

      {/* Mobile Drawer Modal */}
      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button className="absolute inset-0 bg-black/60" aria-label="Close navigation" onClick={() => setOpen(false)} />
          <div className="relative h-full w-[min(86vw,320px)]">{sidebar}</div>
        </div>
      ) : null}

      {/* Desktop Fixed Sidebar */}
      <div className="sticky top-0 hidden h-screen lg:block">{sidebar}</div>
      <div className="min-w-0 flex flex-col flex-1">
        <SessionHeader />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
