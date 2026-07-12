"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "../../lib/auth";

function NavItem({
  href,
  icon,
  title,
}: {
  href: string;
  icon: string;
  title: string;
}) {
  const pathname = usePathname();

  const active = pathname === href;

  return (
    <Link
      href={href}
      className={`block rounded-lg px-4 py-3 transition ${
        active
          ? "bg-blue-600 text-white"
          : "hover:bg-slate-800"
      }`}
    >
      {icon} {title}
    </Link>
  );
}

export default function Sidebar() {

  const router = useRouter();

  function handleLogout() {
    logout();
    router.push("/login");
  }

  return (

    <aside className="w-72 bg-slate-900 text-white flex flex-col">

      <div className="border-b border-slate-700 p-6">

        <h1 className="text-2xl font-bold">
          Connect Hub Co.
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          Faith • Service • Trust
        </p>

      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-2">

        <NavItem
          href="/dashboard"
          icon="🏠"
          title="Dashboard"
        />

        <NavItem
          href="/customers"
          icon="👥"
          title="Customers"
        />

        {/* Pitru Moksha */}

        <div className="rounded-lg bg-slate-800">

          <div className="px-4 py-3 font-semibold">

            🕉️ PitruMoksha

          </div>

          <div className="space-y-1 pb-3">

            <Link
              href="/pitrumoksha/online"
              className="block px-10 py-2 hover:bg-slate-700"
            >
              🌐 Online
            </Link>

            <Link
              href="/pitrumoksha/offline"
              className="block px-10 py-2 hover:bg-slate-700"
            >
              🛕 Offline
            </Link>

          </div>

        </div>

        {/* Ritual Services */}

        <div className="rounded-lg bg-slate-800">

          <div className="px-4 py-3 font-semibold">

            🙏 Ritual Services

          </div>

          <div className="space-y-1 pb-3">

            <Link
              href="/ritual-services/online"
              className="block px-10 py-2 hover:bg-slate-700"
            >
              🌐 Online
            </Link>

            <Link
              href="/ritual-services/offline"
              className="block px-10 py-2 hover:bg-slate-700"
            >
              🛕 Offline
            </Link>

          </div>

        </div>

        <NavItem
          href="/travel-assistance"
          icon="✈️"
          title="Travel Assistance"
        />

        <NavItem
          href="/religious-partners"
          icon="🤝"
          title="Religious Partners"
        />

        <NavItem
          href="/genz-ritual-ai"
          icon="🤖"
          title="GenZ Ritual AI"
        />

      </nav>

      <div className="border-t border-slate-700 p-4">

        <button
          onClick={handleLogout}
          className="w-full rounded-lg bg-red-600 px-4 py-3 font-semibold hover:bg-red-700"
        >
          🚪 Logout
        </button>

      </div>

    </aside>

  );

}