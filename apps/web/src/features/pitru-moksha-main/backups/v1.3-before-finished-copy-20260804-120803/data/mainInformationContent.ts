export type MainInformationSection = {
  readonly heading?: string;
  readonly paragraphs?: readonly string[];
  readonly bullets?: readonly string[];
};

export type MainInformationAction = {
  readonly label: string;
  readonly href: string;
};

export type MainInformationItem = {
  readonly id:
    | "M01"
    | "M02"
    | "M03"
    | "M04"
    | "M05"
    | "M06"
    | "M07"
    | "M08"
    | "M09"
    | "M10";
  readonly title: string;
  readonly summary: string;
  readonly expandedHeading: string;
  readonly sections: readonly MainInformationSection[];
  readonly limitation: string;
  readonly actions: readonly MainInformationAction[];
};

export const mainInformationContent: readonly MainInformationItem[] = [
  {
    id: "M01",
    title: "About PitruMoksha Gaya",
    summary:
      "Understand what the service is, whom it supports and the problems it helps families manage.",
    expandedHeading: "Who We Serve, What We Coordinate and Why It Exists",
    sections: [
      {
        heading: "Who we serve",
        paragraphs: [
          "PitruMoksha Gaya supports families in India and worldwide seeking respectful guidance and coordination for ancestral rituals connected with Gaya Ji.",
          "The appropriate Karta, participant or authorised representative is confirmed according to the ritual requirement. Where ancestor names or Gotra are not immediately available, the family may gather the information from close relatives or available family sources with guidance from the support team.",
        ],
      },
      {
        heading: "What we coordinate",
        paragraphs: [
          "PitruMoksha Gaya provides end-to-end ancestral ritual guidance, coordination and customer assistance exclusively through verified Religious Partners.",
          "Support may include requirement assessment, pathway guidance, preparation, quotation-controlled coordination, service tracking, Vahi assistance and pre- and post-ritual support.",
        ],
      },
      {
        heading: "Why it exists",
        paragraphs: [
          "Families may be uncertain about which ritual may be appropriate, whom they can trust, how they may participate, what information is required and what a confirmed quotation includes.",
          "PitruMoksha Gaya turns these questions into a structured and trackable assistance journey.",
        ],
      },
      {
        heading: "Our mission",
        paragraphs: [
          "Make sacred-service coordination more understandable and accessible through human guidance and technology while respecting traditions, faith, customer dignity, confidentiality and authorised religious decision-making.",
        ],
      },
      {
        heading: "What makes it distinctive",
        bullets: [
          "Human review and guided assistance",
          "Virtual assistance supported by authorised human decisions",
          "Verified Religious Partner coordination",
          "Universal Reference ID tracking",
          "Controlled written quotations",
          "Support before, during and after the confirmed service",
        ],
      },
      {
        heading: "Founder and Admin message",
        paragraphs: [
          "Pind Daan is not merely a transaction. For many families, it is a sacred responsibility connecting the present family with its ancestors. PitruMoksha Gaya supports that responsibility through respectful coordination with approved Religious Partners and traditional custodians.",
        ],
      },
    ],
    limitation:
      "PitruMoksha Gaya coordinates assistance and does not independently replace the religious authority of the officiating Panda or Religious Partner. References to Moksha, liberation, spiritual potency or ancestral peace represent old customs, beliefs, faith, ritual traditions and teachings associated with holy books such as the Garuan Puran. They are not independently verifiable or guaranteed outcomes.",
    actions: [
      {
        label: "Explore Online Pathway",
        href: "/pitru-moksha-gaya/online",
      },
      {
        label: "Explore Offline Pathway",
        href: "/pitru-moksha-gaya/offline",
      },
    ],
  },
  {
    id: "M02",
    title: "Why Connect Hub Co.",
    summary:
      "A human- and virtual-assisted service company organising specialised service journeys.",
    expandedHeading: "Company Introduction, Mission and Assistance Model",
    sections: [
      {
        heading: "Introduction",
        paragraphs: [
          "Connect Hub Co. is a technology-enabled, human- and virtual-assisted service company.",
          "It provides structured guidance, coordination, customer support and end-to-end assistance through verified partners across approved service verticals.",
          "Connect Hub Co. is a service-sector assistance company. It is not itself a religious authority, temple authority, travel operator or government body.",
        ],
      },
      {
        heading: "Mission",
        paragraphs: [
          "Make complex services easier to understand, access and complete through people, technology, trust and controlled workflows.",
        ],
      },
      {
        heading: "Purpose",
        bullets: [
          "Convert unstructured requirements into guided service journeys",
          "Reduce dependence on unverified intermediaries",
          "Provide transparent scope and official communication",
          "Coordinate approved service providers",
          "Maintain tracking and human support",
          "Escalate sensitive or unresolved matters appropriately",
        ],
      },
      {
        heading: "PitruMoksha Gaya vertical",
        paragraphs: [
          "PitruMoksha Gaya is Connect Hub Co.'s specialised ancestral-service coordination vertical for Gaya Ji.",
        ],
      },
      {
        heading: "Company line",
        paragraphs: [
          "Human Guidance. Virtual Assistance. Verified Coordination.",
        ],
      },
      {
        heading: "Capability themes",
        bullets: [
          "Ancestral lineage assistance",
          "Approved ritual-proxy coordination where religiously permitted",
          "Controlled ritual-status verification",
          "End-to-end service management",
          "Privacy, dignity and customer-support coordination",
        ],
      },
    ],
    limitation:
      "Connect Hub Co. does not replace priests, traditional custodians, travel providers, government bodies or lawful local authorities. Unsupported exclusive, absolute, elite or guaranteed-authenticity claims must not be displayed.",
    actions: [
      {
        label: "Raise an Inquiry",
        href: "/contact?topic=pitru-moksha-gaya",
      },
    ],
  },
  {
    id: "M03",
    title: "Ritual Heritage and Gaya Ji",
    summary:
      "Learn why Gaya Ji, its sacred locations and hereditary traditions are significant.",
    expandedHeading:
      "Gaya Ji, Gayawal Pandas, Sacred Locations and Ritual Diversity",
    sections: [
      {
        heading: "Gaya Ji and its tradition",
        paragraphs: [
          "Gaya Ji is widely revered for ancestral rites including Pind Daan, Shraddha and Tarpan.",
          "Gayawal Pandas are a traditional hereditary Brahmin community associated with these ancestral rites and with the preservation of family-linked ritual and pilgrimage traditions.",
          "Traditional custodians maintain handwritten genealogical and pilgrimage records known as Vahis or Panjis.",
        ],
      },
      {
        heading: "Sacred landscape",
        paragraphs: [
          "Depending on the prescribed ritual, relevant locations may include Vishnupad Temple, the Phalgu River, Akshay Vat, Pretshila, Ramshila and other sacred Vedis or authorised ritual locations.",
        ],
      },
      {
        heading: "Ritual diversity",
        paragraphs: [
          "Different rituals may involve Sankalp, Tarpan, Pinda offerings, prayers, Daan, Brahmin Bhojan, Suphala declarations or Visarjan according to their prescribed method.",
        ],
      },
      {
        heading: "Garuan Puran",
        paragraphs: [
          "References connecting Pind Daan and Moksha with the Garuan Puran are presented as matters of religious tradition, faith and holy-book teaching, not as guaranteed or scientifically proven results.",
        ],
      },
      {
        heading: "Why heritage matters",
        paragraphs: [
          "PitruMoksha Gaya respects the role of traditional custodians while providing structured assistance, verified-partner coordination, official communication, tracking and customer support.",
        ],
      },
    ],
    limitation:
      "Do not assume every ritual follows the same procedure, duration, offering or route. The applicable Vidhi, Vedi, sequence, Mantras, offerings, duration, location and route belong to the selected ritual's approved service card and confirmed plan.",
    actions: [
      {
        label: "Explore Vahi Records",
        href: "/vahi-records",
      },
      {
        label: "Open Knowledge Center",
        href: "/knowledge-center",
      },
    ],
  },
  {
    id: "M04",
    title: "How the Assistance Process Works",
    summary:
      "One universal customer-service process, independent of the selected ritual's sacred sequence.",
    expandedHeading: "Inquiry-to-Completion Assistance Journey",
    sections: [
      {
        heading: "01 - Raise an inquiry",
        paragraphs: [
          "The customer shares the family requirement. The system creates or links the Universal Reference ID.",
        ],
      },
      {
        heading: "02 - Provide authorised information",
        paragraphs: [
          "The customer provides relevant contact, ancestor, Gotra, relationship, preferred-date, participation and special-requirement information with consent.",
          "For the applicable ritual ceremony, three generations of ancestors' names may be required. If these are not known, the customer may gather the information from close relatives or family sources with guidance from PitruMoksha Gaya. Unknown information must never be invented.",
        ],
      },
      {
        heading: "03 - Assessment and authorised scope",
        bullets: [
          "Ritual requirement",
          "Karta or participant",
          "Sankalp requirement",
          "Participation-mode suitability",
          "Preparation requirements",
          "Religious Partner and service availability",
          "Applicable limitations",
        ],
      },
      {
        heading: "04 - Quotation and customer approval",
        paragraphs: [
          "The written, version-controlled quotation states the service scope, inclusions, exclusions, schedule, deliverables, charges, applicable taxes and terms.",
        ],
      },
      {
        heading: "05 - Invoice and official payment",
        paragraphs: [
          "Payment is accepted only through approved channels. An inquiry or assessment does not by itself reserve a date or Religious Partner.",
        ],
      },
      {
        heading: "06 - Booking confirmation and preparation",
        paragraphs: [
          "The customer receives the booking reference, confirmed schedule, assigned official contacts, preparation checklist, applicable instructions and support contact.",
        ],
      },
      {
        heading: "07 - Service execution",
        paragraphs: [
          "The customer follows the confirmed participation pathway. Approved milestones, exceptions and authorised changes are recorded against the Universal Reference ID.",
        ],
      },
      {
        heading: "08 - Completion and deliverables",
        paragraphs: [
          "Only documents, status, media, Prasad, dispatch or other deliverables included in the approved quotation are provided.",
        ],
      },
      {
        heading: "09 - Support and closure",
        paragraphs: [
          "The customer may track the service or raise support, complaint or grievance requests. Closure occurs after confirmed deliverables and unresolved matters are addressed.",
        ],
      },
    ],
    limitation:
      "This is the operational customer journey, not the sacred ritual sequence. Ritual Vidhi, Mantras, duration, Samagri, route, location and presence rules remain service-specific.",
    actions: [
      {
        label: "Raise an Inquiry",
        href: "/contact?topic=pitru-moksha-gaya",
      },
      {
        label: "Track Request",
        href: "/tracking",
      },
    ],
  },
  {
    id: "M05",
    title: "Religious Partner Verification",
    summary:
      "Understand verification status without exposing protected records.",
    expandedHeading:
      "Public Verification, Assignment and Protected Evidence",
    sections: [
      {
        heading: "Verified Religious Partners",
        paragraphs: [
          "Religious Partner registration and verification are mandatory. Founder or Admin approval is required before a Religious Partner is published, recommended or assigned.",
          "A public verification status is displayed only when the corresponding check is completed and current.",
        ],
      },
      {
        heading: "Approved public status may include",
        bullets: [
          "Identity Verified",
          "Background Screened and Completed",
          "Traditional Association Reviewed",
          "Approved service categories",
          "Confirmed service area",
          "Approved languages",
          "Verified experience range",
          "Code of Conduct Accepted",
          "Verification or re-verification month and year",
        ],
      },
      {
        heading: "Assignment",
        bullets: [
          "Ritual or service suitability",
          "Approved capability",
          "Language",
          "Traditional requirements",
          "Location",
          "Availability",
          "Customer-support requirements",
        ],
      },
      {
        heading: "Substitution",
        paragraphs: [
          "A Religious Partner must not be silently substituted. The customer is informed of the reason and substitute details.",
          "If a substitution affects scope, duration, price or deliverables, customer approval is required before proceeding.",
        ],
      },
      {
        heading: "Privacy, dignity and fraud prevention",
        paragraphs: [
          "Sensitive family circumstances are handled respectfully and without judgement.",
          "Customers should use only official communication and payment channels and report unexpected payment requests or unauthorised intermediaries.",
        ],
      },
    ],
    limitation:
      "Identity documents and numbers, Aadhaar-related material, police or background reports, verification methods and findings, private addresses, references, assessment answers and scores, bank information, contracts, complaints, investigations and Admin notes remain protected within RPN and Admin records. They must never appear in the website, client props, public API, source HTML, downloads, Knowledge Center or GenZ AI.",
    actions: [
      {
        label: "View Religious Partner Network",
        href: "/religious-partners",
      },
    ],
  },
  {
    id: "M06",
    title: "Ritual Assessment and Service Limitations",
    summary:
      "Every ritual has its own purpose, eligibility, Vidhi and participation requirements.",
    expandedHeading:
      "Purpose, Eligibility, Vidhi, Duration, Samagri and Mode Suitability",
    sections: [
      {
        heading: "Why assessment is required",
        paragraphs: [
          "A service name alone does not determine the correct ritual or participation pathway.",
          "Authorised review considers the family requirement, Karta or participant, ancestor details, Gotra, required generations of ancestor names, preferred date or Tithi, family tradition, requested participation mode and special circumstances.",
        ],
      },
      {
        heading: "Service navigation may include",
        bullets: [
          "Pind Daan or Shraddha",
          "Pitra Atma Shanti",
          "Shared Sankalp",
          "Tripindi Shraddha",
          "Narayan Bali",
          "Nag Bali",
          "Complete Gaya Shraddha",
          "Mahalaya Shraddha",
          "Karma Pind Daan",
          "Ekoddishta Shraddha",
          "Parvana Shraddha",
          "Sapindikarana",
          "Samvatsarik Shraddha",
          "Other approved customised ancestral rituals",
        ],
      },
      {
        heading: "Each service card owns",
        bullets: [
          "Purpose and relevant family circumstances",
          "Eligibility and participant requirements",
          "Online and Offline suitability",
          "Sankalp, proxy or physical-presence rule",
          "Authorised Vidhi and Mantra framework",
          "Indicative duration",
          "Ritual-specific Samagri",
          "Applicable location or route",
          "Approved inclusions and deliverables",
          "Limitations and approval version",
        ],
      },
      {
        heading: "Package principle",
        paragraphs: [
          "A package is an optional assistance-and-deliverables scope. It is not a separate religious determination.",
          "Complete Gaya Shraddha or another Premium package may be offered as a choice-based service package and may cover different approved ritual or service types, subject to assessment, availability and quotation.",
        ],
      },
    ],
    limitation:
      "Do not hard-code one universal ritual sequence, duration, route, Samagri list, participation method or deliverable. Do not publish permanent Live, Photo, Vahi, Proxy or Sankalp Yes-or-No values until each value is approved and versioned.",
    actions: [
      {
        label: "Request Ritual Assessment",
        href: "/contact?topic=pitru-moksha-gaya",
      },
    ],
  },
  {
    id: "M07",
    title: "Why Managed Service Pricing May Be Higher",
    summary:
      "Understand the work, controls and optional assistance behind the quotation.",
    expandedHeading:
      "Cost Drivers, Service Standards and Quotation Control",
    sections: [
      {
        heading: "Managed assistance",
        paragraphs: [
          "PitruMoksha Gaya provides managed assistance rather than an informal contact-only listing.",
        ],
      },
      {
        heading: "Depending on the approved scope, a quotation may include",
        bullets: [
          "Requirement assessment",
          "Verified Religious Partner coordination",
          "Preparation assistance",
          "Dedicated human and virtual support",
          "Schedule and applicable route coordination",
          "Approved Samagri, Dakshina and Daan components",
          "Privacy and official-payment controls",
          "Accessibility support",
          "Exception management",
          "Documentation and customer support",
          "Fair Religious Partner compensation",
          "Applicable taxes",
          "Customised or multi-day requirements",
        ],
      },
      {
        heading: "Why prices differ",
        bullets: [
          "Ritual scope and religious requirements",
          "Number of participants",
          "Date and availability",
          "Online or Offline mode",
          "Location, route and duration",
          "Religious Partner requirements",
          "Assistance level",
          "Travel, stay or accessibility additions",
          "Physical dispatch and deliverables",
        ],
      },
      {
        heading: "Customer protection",
        paragraphs: [
          "The official quotation must show inclusions, exclusions, optional items, applicable taxes, validity, payment terms and relevant cancellation or refund links.",
        ],
      },
      {
        heading: "Main-page pricing rule",
        paragraphs: [
          "Actual package prices are not displayed on the Main page. Detailed prices and packages belong to the appropriate Online or Offline page and the official quotation.",
        ],
      },
    ],
    limitation:
      "A higher price does not prove authenticity or guarantee a spiritual result. Do not display unsupported price multiples, elite-only language, flawless-ritual promises, absolute-authenticity claims or universal all-inclusive promises.",
    actions: [
      {
        label: "Request Official Quotation",
        href: "/contact?topic=pitru-moksha-gaya",
      },
    ],
  },
  {
    id: "M08",
    title: "Trust, Privacy and Official Payments",
    summary:
      "Know how consent, confidentiality, payments and service records are controlled.",
    expandedHeading:
      "Consent, Confidentiality-First Support and Official Channels",
    sections: [
      {
        heading: "Information handling",
        paragraphs: [
          "Only information necessary for authorised inquiry, assessment, booking, delivery, support or legal requirements should be collected.",
          "Information is shared only with authorised persons involved in approved service delivery.",
        ],
      },
      {
        heading: "Confidentiality-First",
        paragraphs: [
          "Confidentiality-First and non-judgemental support are approved service principles.",
        ],
      },
      {
        heading: "No-Questions-Asked acknowledgement",
        paragraphs: [
          "The intake process may include: I acknowledge that I am performing this ritual on behalf of [Name] and require full confidentiality regarding the identity and relationship.",
          "This means respectful and non-judgemental handling. It does not prevent collection of information required for religious, operational, safety or legal purposes.",
        ],
      },
      {
        heading: "Official payments",
        bullets: [
          "Use only official communication and payment channels",
          "Review the written quotation",
          "Retain the invoice or payment request",
          "Retain payment confirmation and applicable receipt",
          "Report suspicious contacts or unexpected payment demands",
        ],
      },
      {
        heading: "Data retention",
        paragraphs: [
          "Retention, archival, correction and deletion follow implemented privacy policies, consent, database controls and applicable legal requirements.",
        ],
      },
    ],
    limitation:
      "Do not promise absolute secrecy, total privacy, automatic destruction, permanent encrypted-vault storage or zero authorised external involvement.",
    actions: [
      {
        label: "Review Privacy Policy",
        href: "/privacy-policy",
      },
      {
        label: "Report a Concern",
        href: "/contact",
      },
    ],
  },
  {
    id: "M09",
    title: "Support, Complaints and Founder/Admin Escalation",
    summary:
      "Use one reference to track support from inquiry through completion.",
    expandedHeading:
      "URMS, Customer Support, Complaint, Grievance and Escalation",
    sections: [
      {
        heading: "Universal Reference ID",
        bullets: [
          "Inquiry and assessment",
          "Quotation and booking",
          "Religious Partner assignment",
          "Service milestones and updates",
          "Deliverables",
          "Support",
          "Complaint and grievance",
          "Closure",
        ],
      },
      {
        heading: "Routing",
        bullets: [
          "Religious questions go to the authorised Religious Partner or religious reviewer",
          "Operational questions go to service support",
          "Sensitive, unresolved, safety-related, financial or provider-conduct matters follow the authorised escalation process",
          "Founder or Admin Support is available where escalation is required",
        ],
      },
      {
        heading: "GenZ Ritual AI may",
        bullets: [
          "Provide approved introductory guidance",
          "Ask one question at a time",
          "Explain approved service categories",
          "Explain Online and Offline pathways",
          "Collect consented inquiry information",
          "Route and escalate the request",
        ],
      },
      {
        heading: "GenZ Ritual AI cannot independently",
        bullets: [
          "Make final ritual decisions",
          "Issue quotations",
          "Collect payments",
          "Confirm or cancel bookings",
          "Approve refunds",
          "Authorise material service changes",
        ],
      },
    ],
    limitation:
      "Founder or Admin escalation is not the first-line route for ordinary questions. Do not close a service record while confirmed deliverables, complaints, grievances or authorised corrective actions remain unresolved.",
    actions: [
      {
        label: "Track Request",
        href: "/tracking",
      },
      {
        label: "Raise Complaint",
        href: "/complaint",
      },
      {
        label: "Founder Support",
        href: "/founder-support",
      },
    ],
  },
  {
    id: "M10",
    title: "Vahi Records and Custodianship",
    summary:
      "Understand what Vahi assistance and traditional custodianship can provide.",
    expandedHeading:
      "Lineage Search, Traditional Custodians and Record Boundaries",
    sections: [
      {
        heading: "What Vahis and Panjis are",
        paragraphs: [
          "Vahis or Panjis are handwritten genealogical and pilgrimage records maintained by traditional Gayawal Pandas or authorised custodians.",
        ],
      },
      {
        heading: "Available records may contain",
        bullets: [
          "Family branches",
          "Gotra",
          "Native village",
          "Ancestor names",
          "Historical visits",
          "Prior pilgrimage or ritual references",
        ],
      },
      {
        heading: "How assistance works",
        paragraphs: [
          "PitruMoksha Gaya and Connect Hub Co. provide structured guidance and coordination through approved Religious Partners or custodians.",
        ],
        bullets: [
          "Understand the search process",
          "Gather known family clues",
          "Reach an appropriate custodian",
          "Explore available family records",
          "Understand relevant entries where assistance is available",
        ],
      },
      {
        heading: "Record authority",
        paragraphs: [
          "Traditional custodians maintain the records. Connect Hub Co. does not create, rewrite or replace original Vahi or Panji entries.",
        ],
      },
    ],
    limitation:
      "Record availability depends on available family information, the appropriate custodian, family branch, location and historical preservation. Do not guarantee that every family record will be found or that every Panda holds every family record.",
    actions: [
      {
        label: "Explore Vahi Records",
        href: "/vahi-records",
      },
    ],
  },
] as const;
