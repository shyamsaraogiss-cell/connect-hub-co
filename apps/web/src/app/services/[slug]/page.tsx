import type { Metadata } from "next";
import { BusinessServiceDetail } from "@/components/service-catalog/BusinessServiceDetail";
import { PublicHeroShell } from "@/features/public-shell";

export const metadata: Metadata = {
  title: "Service details | Connect Hub Co",
  description: "Service information, eligibility, materials, duration, and enquiry options.",
};

export default function ServicePage() {
  return <PublicHeroShell><BusinessServiceDetail /></PublicHeroShell>;
}
