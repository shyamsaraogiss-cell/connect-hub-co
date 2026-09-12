"use client";

import { PublicHeroSidebar } from "@/features/public-shell";
import { useServicesDrawer } from "@/components/auth/ServicesDrawerContext";

export function ServicesDrawerHost() {
  const { open, setOpen } = useServicesDrawer();
  return (
    <PublicHeroSidebar
      open={open}
      onOpenChange={setOpen}
      showTrigger={false}
    />
  );
}
