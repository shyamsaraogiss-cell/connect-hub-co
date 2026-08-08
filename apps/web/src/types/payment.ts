import type { BusinessModuleCategory } from '@/components/inquiry/types';

export type PaymentStatus =
  | 'PENDING'
  | 'PROCESSING'
  | 'SUCCESSFUL'
  | 'FAILED'
  | 'CANCELLED'
  | 'REFUNDED'
  | 'PARTIALLY_REFUNDED';

export type RefundStatus = 'NONE' | 'FULL' | 'PARTIAL';

export type PaymentMethod = 'UPI' | 'CREDIT_CARD' | 'DEBIT_CARD' | 'NET_BANKING' | 'BANK_TRANSFER' | 'RAZORPAY_SIMULATED';

export interface PaymentAuditLog {
  id: string;
  timestamp: string;
  status: PaymentStatus;
  note: string;
  author: string;
}

export interface PaymentTransaction {
  id: string;
  transactionRef: string;
  gatewayRef: string;
  quoteId?: string;
  bookingId?: string;
  inquiryId?: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  category: BusinessModuleCategory;
  serviceName: string;
  amount: number;
  taxAmount: number;
  currency: string;
  status: PaymentStatus;
  refundStatus: RefundStatus;
  refundedAmount?: number;
  failureReason?: string;
  method: PaymentMethod;
  paymentGateway: string;
  receiptNumber: string;
  receiptUrl?: string;
  notes?: string;
  auditHistory: PaymentAuditLog[];
  createdAt: string;
  updatedAt: string;
}

export interface PaymentOrderInput {
  quoteId?: string;
  bookingId?: string;
  inquiryId?: string;
  customerId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  category: BusinessModuleCategory;
  serviceName: string;
  amount: number;
  taxAmount?: number;
  method: PaymentMethod;
  notes?: string;
}
