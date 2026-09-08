export type BusinessModuleCategory =
  | 'pitru-moksha-gaya'
  | 'ritual-services'
  | 'travel-assistance'
  | 'vahi-records'
  | 'religious-partners';

export type ContactPreference = 'WHATSAPP' | 'PHONE' | 'EMAIL';

export type BaseInquiryInput = {
  fullName: string;
  phone: string;
  email: string;
  contactPreference: ContactPreference;
  city: string;
  state: string;
  country: string;
  isNRI: boolean;
  notes?: string;
};

export type GeneralInquiryInput = {
  fullName: string;
  phone: string;
  email: string;
  country: string;
  inquiryCategory: string;
  relatedService?: string;
  preferredContactMethod: string;
  message: string;
};

/* PitruMoksha Gaya Inquiry Specific Inputs */
export type PitruMokshaGayaInquiryInput = BaseInquiryInput & {
  packageCode: 'ESSENTIAL' | 'COMPLETE' | 'FAMILY';
  serviceMode: 'ONLINE' | 'OFFLINE' | 'HYBRID';
  preferredDate: string;
  alternativeDate?: string;
  ancestorNames: string;
  gotra?: string;
  relationToAncestors?: string;
  pilgrimCount: number;
  travelSupportNeeded: boolean;
  accommodationNeeded: boolean;
};

/* Ritual Services Inquiry Specific Inputs */
export type RitualServicesInquiryInput = BaseInquiryInput & {
  serviceDomain: string;
  pujaType: string;
  preferredDate: string;
  serviceMode: 'IN_PERSON' | 'VIRTUAL_LIVESTREAM' | 'BOTH';
  venueType: 'HOME' | 'TEMPLE' | 'SACRED_CITY' | 'VENUE';
  languagePreference: string;
  samagriArrangement: 'BY_PRIEST' | 'BY_FAMILY' | 'GUIDANCE_NEEDED';
};

/* Travel Assistance Inquiry Specific Inputs */
export type TravelAssistanceInquiryInput = BaseInquiryInput & {
  travelCategory: 'PILGRIMAGE_PACKAGE' | 'LOCAL_TRANSPORT' | 'ACCOMMODATION' | 'PRIEST_COORDINATION';
  destination: string;
  travelDate: string;
  returnDate?: string;
  travelerCount: number;
  pickupLocation?: string;
  specialAssistance: boolean;
};

/* Vahi Records Inquiry Specific Inputs */
export type VahiRecordsInquiryInput = BaseInquiryInput & {
  ancestorFullName: string;
  nativePlace: string;
  gotra: string;
  knownPriestReference?: string;
  serviceMode: 'REMOTE' | 'ON_SITE';
  languagePreference: string;
  specialNotes?: string;
};

/* Religious Partners Registration Inquiry Specific Inputs */
export type ReligiousPartnersInquiryInput = BaseInquiryInput & {
  partnerTitle: 'PANDIT' | 'PUROHIT' | 'PANDA' | 'ACHARYA' | 'SCHOLAR' | 'ORGANIZATION';
  partnerPathway: 'RITUAL_PUJA' | 'GAYA_PITRUMOKSHA' | 'LOCATION_BASED' | 'ONLINE_RITUAL' | 'VAHI_RECORDS' | 'LOCAL_COORDINATION';
  primaryLocation: string;
  languagesSpoken: string[];
  yearsOfExperience: number;
  preferredServiceMode: 'PHYSICAL' | 'ONLINE_LIVE_STREAM' | 'BOTH';
  specializations: string[];
  identityProofProvided: boolean;
};

export type UnifiedInquiryDataMap = {
  'pitru-moksha-gaya': PitruMokshaGayaInquiryInput;
  'ritual-services': RitualServicesInquiryInput;
  'travel-assistance': TravelAssistanceInquiryInput;
  'vahi-records': VahiRecordsInquiryInput;
  'religious-partners': ReligiousPartnersInquiryInput;
};
