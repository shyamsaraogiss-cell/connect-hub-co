"use client";

import Sidebar from "../dashboard/Sidebar";
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";

interface Props {
  children: React.ReactNode;
}

export default function AppLayout({
  children,
}: Props) {
  return (
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar />

      <div className="flex flex-1 flex-col">

        <AppHeader />

        <main className="flex-1 overflow-auto p-8">

          {children}

        </main>

        <AppFooter />

      </div>

    </div>
  );
}