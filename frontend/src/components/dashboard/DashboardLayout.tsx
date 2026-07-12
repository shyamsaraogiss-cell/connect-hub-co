"use client";

import { ReactNode } from "react";

import DashboardHeader from "./DashboardHeader";
import HeroBanner from "./HeroBanner";
import KPICards from "./KPICards";
import DashboardModules from "./DashboardModules";

interface Props {
  children?: ReactNode;
}

export default function DashboardLayout({
  children,
}: Props) {
  return (
    <div className="space-y-8">

      <DashboardHeader />

      <HeroBanner />

      <KPICards />

      <DashboardModules />

      {children}

    </div>
  );
}