"use client";

import { usePathname } from "next/navigation";
import { BusinessDashboard } from "./BusinessDashboard";
import { InternalSidebar } from "@/components/auth/InternalSidebar";
import { NeedHelpAITrigger } from "@/features/ai/components/NeedHelpAITrigger";

export function PageContent({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const exceptionPage =
    path === "/login" ||
    path === "/register" ||
    path === "/verify-email";

  const publicRoute =
    exceptionPage ||
    path === "/" ||
    path === "/about" ||
    path === "/contact" ||
    path === "/services" ||
    path === "/zen-g" ||
    path.startsWith("/pitru-moksha-gaya") ||
    path.startsWith("/ritual-services") ||
    path === "/vahi-records" ||
    path === "/travel-assistance" ||
    path.startsWith("/travel-assistance/success") ||
    path.startsWith("/religious-partners") ||
    path === "/knowledge-center" ||
    path === "/tracking" ||
    path === "/complaint" ||
    path === "/grievance" ||
    path === "/policies-legal-terms" ||
    path === "/refund-policy" ||
    path === "/booking-terms" ||
    path === "/cancellation-policy" ||
    path === "/privacy-policy" ||
    path === "/terms" ||
    path === "/founder-support" ||
    path === "/route-index";

  if (publicRoute) {
    return (
      <>
        {children}
        {exceptionPage ? <NeedHelpAITrigger /> : null}
      </>
    );
  }
  return (
    <InternalSidebar>
      {path === "/dashboard" ? <BusinessDashboard /> : children}
      <NeedHelpAITrigger />
    </InternalSidebar>
  );
}
