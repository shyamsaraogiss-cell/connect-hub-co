import type { AIConversationTree, BusinessCategory } from '../types/ai.types';

export const APPROVED_AI_KNOWLEDGE_TREES: Record<BusinessCategory, AIConversationTree> = {
  'pitru-moksha-gaya': {
    categoryId: 'pitru-moksha-gaya',
    title: 'PitruMoksha Gaya Ritual AI',
    greeting: 'Namaste! I am your Gaya Ji ancestral ritual assistant. Select a topic or question to get verified guidance.',
    initialPrompts: [],
    fallbackResponse: 'Approved public knowledge is currently being updated. Please use Raise Inquiry for assistance.',
  },
  'ritual-services': {
    categoryId: 'ritual-services',
    title: 'Vaidik Ritual & Puja AI',
    greeting: 'Namaste! Ask me about authentic home pujas, Havan, Griha Pravesh, Dosh Shanti, or custom Vaidik ceremonies.',
    initialPrompts: [],
    fallbackResponse: 'Approved public knowledge is currently being updated. Please use Raise Inquiry for assistance.',
  },
  'travel-assistance': {
    categoryId: 'travel-assistance',
    title: 'Sacred Pilgrimage Travel AI',
    greeting: 'Namaste! Need assistance with arrival pickup, elder care, hotel stay, ghat assistance, or local escort support for your pilgrimage?',
    initialPrompts: [],
    fallbackResponse: 'Approved public knowledge is currently being updated. Please use Raise Inquiry for assistance.',
  },
  'vahi-records': {
    categoryId: 'vahi-records',
    title: 'Vahi Lineage & Ledger AI',
    greeting: 'Namaste! Looking to understand Vahi meanings, search family records, or verify historic lineage ledgers in Gaya Ji?',
    initialPrompts: [],
    fallbackResponse: 'Approved public knowledge is currently being updated. Please use Raise Inquiry for assistance.',
  },
  'religious-partners': {
    categoryId: 'religious-partners',
    title: 'Verified Priest Network AI',
    greeting: 'Namaste! Are you a Pandit Ji, Purohit, Acharya, or traditional Gaya Panda seeking to join our network?',
    initialPrompts: [],
    fallbackResponse: 'Approved public knowledge is currently being updated. Please use Raise Inquiry for assistance.',
  },
  booking: {
    categoryId: 'booking',
    title: 'Booking & Dakshina Quote AI',
    greeting: 'Namaste! I am your Booking Assistant. How can I assist with your ritual or pilgrimage booking?',
    initialPrompts: [],
    fallbackResponse: 'Approved public knowledge is currently being updated. Please use Raise Inquiry for assistance.',
  },
  inquiry: {
    categoryId: 'inquiry',
    title: 'Service & Custom Inquiry AI',
    greeting: 'Namaste! Have a question about custom ritual requirements, dates, or family arrangements?',
    initialPrompts: [],
    fallbackResponse: 'Approved public knowledge is currently being updated. Please use Raise Inquiry for assistance.',
  },
  tracking: {
    categoryId: 'tracking',
    title: 'Universal Reference Tracking AI',
    greeting: 'Namaste! Looking to track your service request or verify your Universal Reference ID?',
    initialPrompts: [],
    fallbackResponse: 'Approved public knowledge is currently being updated. Please use Raise Inquiry for assistance.',
  },
  complaint: {
    categoryId: 'complaint',
    title: 'Quality & Service Complaint AI',
    greeting: 'Namaste. We hold service quality to strict standards. How can we resolve your issue?',
    initialPrompts: [],
    fallbackResponse: 'Approved public knowledge is currently being updated. Please use Raise Inquiry for assistance.',
  },
  grievance: {
    categoryId: 'grievance',
    title: 'Formal Grievance Redressal AI',
    greeting: 'Namaste. We are committed to transparency and ethical governance. Please state your grievance.',
    initialPrompts: [],
    fallbackResponse: 'Approved public knowledge is currently being updated. Please use Raise Inquiry for assistance.',
  },
  'founder-support': {
    categoryId: 'founder-support',
    title: 'Founder Desk & Priority AI',
    greeting: 'Namaste! Founder Support handles high-priority escalations, strategic inquiries, and executive assistance.',
    initialPrompts: [],
    fallbackResponse: 'Approved public knowledge is currently being updated. Please use Raise Inquiry for assistance.',
  },
  'company-info': {
    categoryId: 'company-info',
    title: 'Company Governance & Info AI',
    greeting: 'Namaste! Welcome to Connect Hub Co. How may I assist you with company details, policies, or guidance?',
    initialPrompts: [],
    fallbackResponse: 'Approved public knowledge is currently being updated. Please use Raise Inquiry for assistance.',
  },
};










