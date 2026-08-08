import type { BusinessModuleCategory } from '@/components/inquiry/types';

export type QuoteStatus = 'DRAFT' | 'APPROVED' | 'SENT' | 'ACCEPTED' | 'REJECTED' | 'EXPIRED' | 'REVISED';

export interface QuoteItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface QuoteVersion {
  version: number;
  createdAt: string;
  createdBy: string;
  totalAmount: number;
  notes?: string;
}

export interface ServiceQuote {
  id: string;
  quoteNumber: string;
  leadId?: string;
  bookingId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerCountry: string;
  category: BusinessModuleCategory;
  serviceName: string;
  preferredDate?: string;
  items: QuoteItem[];
  subtotal: number;
  tax: number;
  totalAmount: number;
  status: QuoteStatus;
  inclusions: string[];
  exclusions: string[];
  termsAndConditions: string;
  notes?: string;
  version: number;
  versionHistory: QuoteVersion[];
  approvedByAdmin?: string;
  approvedAt?: string;
  issuedAt: string;
  validUntil: string;
  pdfUrl?: string;
}

export interface QuoteInput {
  leadId?: string;
  bookingId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerCountry?: string;
  category: BusinessModuleCategory;
  serviceName: string;
  preferredDate?: string;
  items: Array<{ description: string; quantity: number; unitPrice: number }>;
  inclusions?: string[];
  exclusions?: string[];
  termsAndConditions?: string;
  notes?: string;
}
