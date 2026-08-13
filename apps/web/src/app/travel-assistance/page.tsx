import type { Metadata } from "next";
import { StaticBusinessHeroPage } from "@/components/business-pages/StaticBusinessHeroPage";
import { TravelAssistanceContent } from "@/components/business-pages/travel-assistance/TravelAssistanceContent";
export const metadata:Metadata={title:"Travel Assistance Across India & Nepal | Connect Hub Co.",description:"Explore verified travel coordination, shadow assistance, emergency family support, and local ground assistance across India and Nepal."};
export default function TravelAssistancePage(){return <StaticBusinessHeroPage slideId="travel-assistance"><TravelAssistanceContent /></StaticBusinessHeroPage>}
