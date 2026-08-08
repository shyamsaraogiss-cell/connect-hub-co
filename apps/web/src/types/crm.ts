import type { BusinessModuleCategory } from '@/components/inquiry/types';
import type { BookingStatus } from '@/types/booking';

export type LeadStatus =
  | 'NEW'
  | 'CONTACTED'
  | 'QUALIFIED'
  | 'FOLLOW_UP'
  | 'QUOTE_PENDING'
  | 'CONVERTED'
  | 'CLOSED'
  | 'LOST';

export type LeadPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

export interface InquiryHistoryEvent {
  id: string;
  timestamp: string;
  note: string;
  author: string;
}

export interface CRMLead {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerCity: string;
  customerCountry: string;
  isNRI: boolean;
  category: BusinessModuleCategory;
  inquirySource: 'AI_ASSISTANT' | 'WEBSITE_FORM' | 'DIRECT' | 'PHONE' | 'PARTNER_REFERRAL';
  inquiryId?: string;
  bookingId?: string;
  bookingStatus?: BookingStatus;
  assignedAdmin?: string;
  status: LeadStatus;
  priority: LeadPriority;
  followUpDate?: string;
  internalNotes?: string;
  inquiryHistory: InquiryHistoryEvent[];
  ancestorDetails?: string;
  gotra?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CRMLeadInput {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerCity?: string;
  customerCountry?: string;
  isNRI?: boolean;
  category: BusinessModuleCategory;
  inquirySource?: 'AI_ASSISTANT' | 'WEBSITE_FORM' | 'DIRECT' | 'PHONE' | 'PARTNER_REFERRAL';
  inquiryId?: string;
  bookingId?: string;
  assignedAdmin?: string;
  status?: LeadStatus;
  priority?: LeadPriority;
  followUpDate?: string;
  internalNotes?: string;
  ancestorDetails?: string;
  gotra?: string;
}
