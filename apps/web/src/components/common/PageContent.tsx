"use client";

import { usePathname } from "next/navigation";
import { BusinessHome } from "./BusinessHome";
import { BusinessAbout } from "./BusinessAbout";
import { BusinessContact } from "./BusinessContact";
import { BusinessDashboard } from "./BusinessDashboard";
import { BusinessCatalog } from "@/components/service-catalog/BusinessCatalog";
import { BusinessServiceDetail } from "@/components/service-catalog/BusinessServiceDetail";
import { InternalSidebar } from "@/components/auth/InternalSidebar";
import { PublicHeroShell } from "@/features/public-shell";
import { NeedHelpAITrigger } from "@/features/ai/components/NeedHelpAITrigger";

export function PageContent({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  if (path === "/") return <BusinessHome />;
  if (path === "/about") return <PublicHeroShell><BusinessAbout /></PublicHeroShell>;
  if (path === "/contact") return <PublicHeroShell><BusinessContact /></PublicHeroShell>;
  if (path === "/services") return <PublicHeroShell><BusinessCatalog /></PublicHeroShell>;
  if (path.startsWith("/services/")) return <PublicHeroShell><BusinessServiceDetail /></PublicHeroShell>;

  const exceptionPage =
    path === "/login" ||
    path === "/register" ||
    path === "/verify-email" ||
    path.startsWith("/payment") ||
    path.startsWith("/checkout");

  const publicRoute =
    exceptionPage ||
    path === "/zen-g" ||
    path === "/pitru-moksha" ||
    path.startsWith("/pitru-moksha/success") ||
    path.startsWith("/pitru-moksha-gaya") ||
    path.startsWith("/ritual-services") ||
    path === "/vahi-records" ||
    path.startsWith("/travel-assistance") ||
    path.startsWith("/travel-assistance/success") ||
    path === "/religious-partners" ||
    path === "/knowledge-center" ||
    path === "/tracking" ||
    path === "/complaint" ||
    path === "/grievance" ||
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

