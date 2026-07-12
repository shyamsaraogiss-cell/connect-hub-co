"use client";

import Link from "next/link";

const modules = [
  {
    title: "🕉️ PitruMoksha Gaya",
    href: "/pitrumoksha",
  },
  {
    title: "🙏 Ritual Services",
    href: "/ritual-services",
  },
  {
    title: "✈️ Travel Assistance",
    href: "/travel-assistance",
  },
  {
    title: "🤝 Religious Partners",
    href: "/religious-partners",
  },
  {
    title: "👥 Customers",
    href: "/customers",
  },
  {
    title: "🤖 GenZ Ritual AI",
    href: "/genz-ritual-ai",
  },
];

export default function DashboardModules() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

      {modules.map((module) => (

        <Link
          key={module.title}
          href={module.href}
          className="rounded-2xl bg-white p-6 shadow transition-all duration-300 hover:-translate-y-1 hover:bg-blue-600 hover:text-white hover:shadow-xl"
        >

          <h3 className="text-xl font-semibold">
            {module.title}
          </h3>

        </Link>

      ))}

    </div>
  );
}