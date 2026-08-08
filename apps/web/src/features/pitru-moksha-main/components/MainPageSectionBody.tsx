import type { MainPageSectionDefinition } from "../data/mainPageContent";
import { ConnectHubSection } from "./ConnectHubSection";
import { CustomerJourneySection } from "./CustomerJourneySection";
import { EligibilitySection } from "./EligibilitySection";
import { FounderSection } from "./FounderSection";
import { HeritageSection } from "./HeritageSection";
import { SacredJourneySection } from "./SacredJourneySection";
import { ServiceFrameworkSection } from "./ServiceFrameworkSection";
import { WhyFamiliesChooseSection } from "./WhyFamiliesChooseSection";

type SectionId = MainPageSectionDefinition["id"];

export function MainPageSectionBody({
  sectionId,
}: {
  readonly sectionId: SectionId;
}) {
  switch (sectionId) {
    case "heritage":
      return <HeritageSection />;

    case "sacred-journey":
      return <SacredJourneySection />;

    case "why-families-choose":
      return <WhyFamiliesChooseSection />;

    case "eligibility-assessment":
      return <EligibilitySection />;

    case "founder-message":
      return <FounderSection />;

    case "connect-hub":
      return <ConnectHubSection />;

    case "service-framework":
      return <ServiceFrameworkSection />;

    case "customer-journey":
      return <CustomerJourneySection />;
  }
}
