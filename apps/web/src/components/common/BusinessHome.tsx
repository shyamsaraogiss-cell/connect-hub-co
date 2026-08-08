import { Suspense } from "react";import { HeroCarousel } from "@/features/hero";import { PublicHeroShell } from "@/features/public-shell";
export function BusinessHome(){return <PublicHeroShell><Suspense fallback={null}><HeroCarousel/></Suspense></PublicHeroShell>}
