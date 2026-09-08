import type { Metadata } from "next";
import Image from "next/image";
import { PublicHeroShell } from "@/features/public-shell";
import { TravelAssistanceContent } from "@/components/business-pages/travel-assistance/TravelAssistanceContent";
import vahiStyles from "@/components/business-pages/vahi-records/VahiApprovedContent.module.css";
import travelStyles from "@/components/business-pages/travel-assistance/TravelAssistancePage.module.css";
export const metadata:Metadata={title:"Travel Assistance Across India & Nepal | Connect Hub Co.",description:"Explore verified travel coordination, shadow assistance, emergency family support, and local ground assistance across India and Nepal."};
export default function TravelAssistancePage(){return <PublicHeroShell><section className={`${vahiStyles.intro} ${travelStyles.heroSection} h-[237px]`} aria-labelledby="travel-hero-title"><Image className={travelStyles.heroBackground} src="/images/heroes/hero-3/hero-3-travel-assistance-info.png" alt="" fill sizes="1139px" priority /><div className={travelStyles.heroOverlay} aria-hidden="true" /><div className={travelStyles.heroLayout}><div className={travelStyles.heroCopy}><p>CONNECT HUB CO.</p><h1 id="travel-hero-title">Your Shadow Traveler—always with You, always for You. A Worry-Free Journey.</h1></div></div></section><TravelAssistanceContent /></PublicHeroShell>}
