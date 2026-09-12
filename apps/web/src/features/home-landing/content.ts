import { ROUTES } from '@/config/navigation';

export const homeLandingContent = {
  brand: 'Connect Hub Co.',
  slides: [
    {
      id: 'pitru-moksha-gaya',
      headline: 'PitruMoksha Gaya',
      support: 'Distance Never Stops Devotion — ancestral-ritual coordination for Gaya pathways.',
      cta: {
        label: 'Explore PitruMoksha Gaya',
        href: ROUTES.PITRU_MOKSHA_GAYA,
      },
      image: {
        src: '/images/heroes/hero-1/Hero_1_PitruMoksha_Gaya_v2.0.png',
        alt: 'PitruMoksha Gaya sacred coordination',
      },
    },
    {
      id: 'ritual-services',
      headline: 'Ritual Services',
      support: 'Broader ritual coordination with Verified Priests — online or in person.',
      cta: {
        label: 'Explore Ritual Services',
        href: ROUTES.RITUAL_SERVICES,
      },
      image: {
        src: '/images/heroes/hero-2/Hero_2_Ritual_Services_v1.0.png',
        alt: 'Ritual services atmosphere',
      },
    },
    {
      id: 'travel-assistance',
      headline: 'Travel Assistance',
      support: 'Practical pilgrimage travel support across India and Nepal pathways.',
      cta: {
        label: 'Explore Travel Assistance',
        href: ROUTES.TRAVEL_ASSISTANCE,
      },
      image: {
        src: '/images/heroes/hero-3/Hero_3_Travel_Assistance_v1.0.png',
        alt: 'Sacred travel assistance',
      },
    },
    {
      id: 'vahi-records',
      headline: 'Vahi Records',
      support:
        'Guided ancestral lineage documentation and Vahi (Panji) assistance with authorised custodians.',
      cta: {
        label: 'Explore Vahi Records',
        href: ROUTES.VAHI_RECORDS,
      },
      image: {
        src: '/images/heroes/hero-4/Hero_4_Vahi_Records_v1.0.png',
        alt: 'Traditional Vahi ancestral records',
      },
    },
    {
      id: 'verified-priest',
      headline: 'Verified Priest',
      support: 'Join the Verified Priest network — ritual authenticity led by qualified partners.',
      cta: {
        label: 'Explore Verified Priest',
        href: ROUTES.RELIGIOUS_PARTNERS,
      },
      image: {
        src: '/images/heroes/hero-5/Hero_5_Religious_Partner_Network_v1.0.png',
        alt: 'Verified Priest network',
      },
    },
  ],
  whyUs: {
    eyebrow: '/ WHY US',
    title: 'Duty, coordination, and clear authority',
    support:
      'Families need reverence and reliability. Here’s how Connect Hub Co. holds both.',
    defaultOpenId: 'duty',
    panels: [
      {
        id: 'duty',
        number: '01',
        title: 'The duty',
        body: 'Ancestral rites are an act of love and responsibility. We help families approach that duty with clarity, dignity, and dependable support.',
        meanings: [
          'Guidance that respects the emotional weight of the work',
          'Clear next steps instead of guesswork',
          'Support that stays human and dignified',
        ],
      },
      {
        id: 'coordination',
        number: '02',
        title: 'How we coordinate',
        body: 'Structured guidance, scheduling, and end-to-end operational help. Ritual correctness stays with Verified Priests — we don’t replace religious authority.',
        meanings: [
          'Logistics and scheduling handled with care',
          'End-to-end operational assistance',
          'Ritual authority remains with qualified priests',
        ],
      },
      {
        id: 'priests-ai',
        number: '03',
        title: 'Verified Priests & responsible AI',
        body: 'Human priests lead ritual authenticity. Zen G explains and guides options; it does not claim spiritual authority.',
        meanings: [
          'Priests own ritual correctness',
          'Zen G helps navigate questions and choices',
          'No AI spiritual authority claims',
        ],
      },
    ],
  },
  finalEnquire: {
    title: 'Speak with a coordinator',
    body: 'Share your situation. A human coordinator will help you take the next respectful step.',
    cta: {
      label: 'Talk to a coordinator',
      href: ROUTES.INQUIRY,
    },
  },
} as const;

export type HomeLandingContent = typeof homeLandingContent;
export type HomeLandingSlide = (typeof homeLandingContent.slides)[number];
