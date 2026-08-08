export type MainPageTone =
  | "heritage"
  | "sacred"
  | "service"
  | "guidance"
  | "protected"
  | "limitation";

export type MainPageAction = {
  readonly label: string;
  readonly href: string;
};

export type MainPageSectionDefinition = {
  readonly id:
    | "heritage"
    | "sacred-journey"
    | "why-families-choose"
    | "eligibility-assessment"
    | "founder-message"
    | "connect-hub"
    | "service-framework"
    | "customer-journey";
  readonly number: string;
  readonly title: string;
  readonly subtitle: string;
  readonly summary: string;
  readonly tone: MainPageTone;
  readonly initiallyExpanded: boolean;
};

export const mainPageOpening = {
  eyebrow: "Explore the Land of Moksha",
  title: "PitruMoksha Gaya",
  subtitle:
    "Understand the rite. Choose how you wish to participate. Proceed with clarity.",
  promise: "Distance Never Stops Devotion.",
  introduction: [
    "PitruMoksha Gaya is a specialized ancestral-ritual coordination service platform powered by Connect Hub Co.",
    "Here, Pind Daan is a sacred bridge connecting the present family with the roots of its ancestors. PitruMoksha Gaya connects families with verified and trusted Gayawal Pandas—the hereditary custodians of Gaya Ji's ancestral rites.",
    "The service makes sacred ancestral-ritual coordination accessible through online or physical participation while preserving tradition, dignity, authenticity, respect and customer confidentiality.",
  ],
  cautionTitle: "Make sure",
  caution:
    "Do not assume that every ritual follows the same procedure, duration, offerings, mantras, Vidhi or route. The ritual and the participation mode are two separate decisions.",
  ritualOverview:
    "Pind Daan, Sharadh, Tarpan, Narayan Bali, Nag Bali, Tripindi Sharadh and other prescribed ancestral rites retain their own purpose, Vidhi, mantras, offerings, duration and sacred locations.",
  pathwayIntroduction: "Choose the pathway that suits your family:",
  pathways: [
    {
      title: "Online Services",
      description:
        "Remote participation, Live Sankalp or approved representative-led coordination, subject to ritual suitability and confirmed service scope.",
      href: "/pitru-moksha-gaya/online",
    },
    {
      title: "Offline Services",
      description:
        "In-person participation at Gaya Ji with local ritual coordination and specifically approved assistance.",
      href: "/pitru-moksha-gaya/offline",
    },
  ],
  guidance:
    "Not sure which rite or pathway applies? Ask GenZ Ritual AI for initial information or raise an inquiry for authorised human assessment.",
  actions: [
    {
      label: "Explore Online Services",
      href: "/pitru-moksha-gaya/online",
    },
    {
      label: "Explore Offline Services",
      href: "/pitru-moksha-gaya/offline",
    },
    {
      label: "Raise an Inquiry",
      href: "/contact?topic=pitru-moksha-gaya",
    },
  ],
} as const;

export const mainPageSections: readonly MainPageSectionDefinition[] = [
  {
    id: "heritage",
    number: "01",
    title: "The Heritage of the Gayawal Pandas",
    subtitle: "Gaya Ji's hereditary custodians of ancestral rites",
    summary:
      "Understand the Gayawal Panda tradition, the Vahi or Panji records and why Gaya Ji holds a special place in ancestral observances.",
    tone: "heritage",
    initiallyExpanded: true,
  },
  {
    id: "sacred-journey",
    number: "02",
    title: "The Sacred Journey at Gaya Ji",
    subtitle:
      "Sacred locations, prescribed rites and a journey that varies by ritual",
    summary:
      "Explore the sacred locations and an illustrative sequence while recognising that the confirmed ritual—not a generic table—determines the actual route.",
    tone: "sacred",
    initiallyExpanded: false,
  },
  {
    id: "why-families-choose",
    number: "03",
    title: "Why Families Choose PitruMoksha Gaya",
    subtitle:
      "One trusted point of coordination for a sensitive ancestral responsibility",
    summary:
      "See how Panda coordination, service clarity, tracking, participation support and customer assistance come together in one journey.",
    tone: "service",
    initiallyExpanded: false,
  },
  {
    id: "eligibility-assessment",
    number: "04",
    title: "Eligibility, Ritual Assessment and Timing",
    subtitle:
      "The correct rite begins with the family's circumstances—not with a package name",
    summary:
      "Understand Sankalp information, participant assessment, ritual timing, Samagri and what must be confirmed before performance.",
    tone: "guidance",
    initiallyExpanded: false,
  },
  {
    id: "founder-message",
    number: "05",
    title: "A Message from the Founder/Admin",
    subtitle:
      "Sacred responsibility must be met with clarity, dignity and care",
    summary:
      "Read the commitment governing Panda coordination, service clarity, respectful handling, escalation and customer support.",
    tone: "protected",
    initiallyExpanded: false,
  },
  {
    id: "connect-hub",
    number: "06",
    title: "Who Is Connect Hub Co. and What We Do",
    subtitle:
      "Human guidance, virtual assistance and verified coordination",
    summary:
      "Understand the company, its role, its boundaries and the service-management framework supporting PitruMoksha Gaya.",
    tone: "service",
    initiallyExpanded: false,
  },
  {
    id: "service-framework",
    number: "07",
    title: "Service Framework",
    subtitle:
      "Choose the rite first; then choose the available participation pathway",
    summary:
      "Review principal ancestral rites, participation modes and assistance features without treating pathways or support features as separate rituals.",
    tone: "heritage",
    initiallyExpanded: false,
  },
  {
    id: "customer-journey",
    number: "08",
    title: "Booking Preparation and Customer Journey",
    subtitle: "From family requirement to supported completion",
    summary:
      "Follow the universal inquiry-to-completion assistance workflow while the sacred ritual sequence remains specific to the selected rite.",
    tone: "guidance",
    initiallyExpanded: false,
  },
] as const;

export const mainPageClosing = {
  eyebrow: "Guided Next Step",
  title: "Choose the Appropriate PitruMoksha Gaya Pathway",
  description:
    "Share your family requirement for authorised review. Ritual suitability, participation mode, Gayawal Panda availability, preparation requirements and service inclusions are explained before confirmation.",
  primaryAction: {
    label: "Raise an Inquiry",
    href: "/contact?topic=pitru-moksha-gaya",
  },
  secondaryAction: {
    label: "Ask GenZ Ritual AI",
    href: "/zen-g",
  },
  scopeNotice:
    "Ritual descriptions explain traditional customs, beliefs and available service coordination. They do not guarantee Moksha or any other spiritual outcome. Final services remain subject to ritual assessment, verified Gayawal Panda availability, sacred-site rules, written quotation, payment confirmation and operating conditions.",
} as const;
