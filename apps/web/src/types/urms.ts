export type URMSRequestType =
  | 'INQUIRY'
  | 'BOOKING'
  | 'SERVICE_REQUEST'
  | 'PARTNER_REGISTRATION'
  | 'COMPLAINT'
  | 'GRIEVANCE'
  | 'FOUNDER_SUPPORT'
  | 'OTHER';

export type URMSStatus =
  | 'SUBMITTED'
  | 'ACKNOWLEDGED'
  | 'ASSIGNED'
  | 'UNDER_REVIEW'
  | 'WAITING_FOR_CUSTOMER'
  | 'APPROVED'
  | 'SCHEDULED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'RESOLVED'
  | 'CLOSED'
  | 'REJECTED'
  | 'CANCELLED';

export type URMSPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

export type URMSAssignmentTeam =
  | 'Operations'
  | 'Ritual Team'
  | 'Travel Team'
  | 'Vahi Team'
  | 'Religious Partner Team'
  | 'Accounts'
  | 'Support'
  | 'Admin'
  | 'Founder';

export type URMSCommunicationType =
  | 'CUSTOMER_MESSAGE'
  | 'ADMIN_REPLY'
  | 'FOUNDER_REPLY'
  | 'INTERNAL_NOTE'
  | 'EMAIL'
  | 'WHATSAPP'
  | 'AI_CONVERSATION'
  | 'SYSTEM_NOTIFICATION';

export type URMSVisibility = 'CUSTOMER_VISIBLE' | 'INTERNAL_ONLY';

export interface URMSCommunicationMessage {
  id: string;
  referenceId: string;
  sender: string;
  visibility: URMSVisibility;
  channel: URMSCommunicationType;
  message: string;
  timestamp: string;
  attachmentReferences?: string[];
}

export type URMSDocumentCategory =
  | 'CUSTOMER_UPLOAD'
  | 'SUPPORTING_DOCUMENT'
  | 'GENERATED_QUOTATION'
  | 'INVOICE'
  | 'RECEIPT'
  | 'CERTIFICATE'
  | 'RITUAL_DOCUMENT'
  | 'TRAVEL_DOCUMENT'
  | 'REGISTRATION_DOCUMENT'
  | 'COMPLAINT_EVIDENCE'
  | 'GRIEVANCE_EVIDENCE'
  | 'OTHER';

export interface URMSDocumentItem {
  id: string;
  referenceId: string;
  fileName: string;
  category: URMSDocumentCategory;
  uploadedBy: string;
  visibility: URMSVisibility;
  uploadDate: string;
  storageRef: string;
  fileSize?: number;
}

export interface URMSStatusHistoryRecord {
  id: string;
  referenceId: string;
  previousStatus?: URMSStatus;
  newStatus: URMSStatus;
  previousStage?: string;
  newStage: string;
  changedBy: string;
  changeSource: 'SYSTEM' | 'ADMIN' | 'CUSTOMER' | 'FOUNDER' | 'WORKFLOW';
  publicNote?: string;
  internalNote?: string;
  timestamp: string;
}

export interface URMSTimelineEvent {
  id: string;
  timestamp: string;
  status: URMSStatus;
  title: string;
  description: string;
  actor: string;
  isPublic: boolean;
  metadata?: Record<string, unknown>;
}

export type CommercialWorkflowStage =
  | 'NOT_STARTED'
  | 'QUOTATION_DRAFT'
  | 'QUOTATION_RELEASED'
  | 'QUOTATION_CHANGE_REQUESTED'
  | 'QUOTATION_REJECTED'
  | 'QUOTATION_ACCEPTED'
  | 'AGREEMENT_AVAILABLE'
  | 'AGREEMENT_ACCEPTED'
  | 'AWAITING_EXTERNAL_PAYMENT'
  | 'PAYMENT_CONFIRMED'
  | 'BOOKING_CONFIRMED';

export type CustomerQuotationStatus =
  | 'RELEASED'
  | 'CHANGE_REQUESTED'
  | 'ACCEPTED'
  | 'REJECTED'
  | 'EXPIRED'
  | 'SUPERSEDED';

export type CustomerQuotationDecision = 'ACCEPT' | 'REQUEST_CHANGE' | 'REJECT';
export type ExternalBankPaymentMode = 'BANK_TRANSFER' | 'NEFT' | 'RTGS' | 'IMPS';

export interface CustomerSafeQuotation {
  id: string;
  version: number;
  status: CustomerQuotationStatus;
  serviceName: string;
  serviceScope: string;
  inclusions: string[];
  exclusions: string[];
  basePrice: string;
  applicableChargesTaxes: string;
  finalPrice: string;
  currency: string;
  validUntil: string | null;
  notes: string | null;
  paymentTerms: string;
  paymentInstructions: string;
  releasedAt: string | null;
  acceptedAt: string | null;
  rejectedAt: string | null;
  decision: {
    decision: CustomerQuotationDecision;
    changeRequest: string | null;
    decidedAt: string;
  } | null;
}

export interface CustomerSafeAgreement {
  id: string;
  version: number;
  status: 'AVAILABLE' | 'ACCEPTED';
  serviceRequestId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  selectedService: string;
  agreedScope: string;
  inclusions: string[];
  exclusions: string[];
  finalAgreedPrice: string;
  currency: string;
  paymentTerms: string;
  paymentInstructions: string;
  customerResponsibilities: string[];
  connectHubResponsibilities: string[];
  cancellationRefundPolicyReference: string;
  importantServiceDisclosures: string[];
  generatedAt: string;
  acceptance: {
    agreementVersion: number;
    acceptedAt: string;
  } | null;
}

export interface CustomerSafeCommercialWorkflow {
  stage: CommercialWorkflowStage;
  bookingConfirmedAt: string | null;
  quotations: CustomerSafeQuotation[];
  agreements: CustomerSafeAgreement[];
  externalPayment: {
    status: 'AWAITING_EXTERNAL_PAYMENT' | 'PAYMENT_CONFIRMED';
    amountConfirmed: string | null;
    currency: string;
    externalReference: string | null;
    confirmedAt: string | null;
  } | null;
  paymentDetails: {
    amountPaid: string;
    currency: string;
    paymentDate: string;
    externalReference: string;
    paymentMode: ExternalBankPaymentMode;
    payerName: string;
    remarks: string | null;
    submittedAt: string;
  } | null;
}

export interface URMSUniversalRecord {
  id: string;
  referenceId: string; // CHC-YYYY-XXXXXX
  requestType: URMSRequestType;
  relatedService?: string;
  customerId?: string;
  guestName: string;
  guestPhone: string;
  guestEmail: string;
  title: string;
  description: string;
  currentStatus: URMSStatus;
  currentStage: string;
  assignedTeam?: URMSAssignmentTeam;
  assignedUser?: string;
  priority: URMSPriority;
  sourceChannel: string;
  createdAt: string;
  updatedAt: string;
  closedAt?: string;
  expectedNextStep?: string;
  parentReferenceId?: string;
  relatedReferenceIds?: string[];
  metadata?: Record<string, unknown>;
  history: URMSStatusHistoryRecord[];
  timeline: URMSTimelineEvent[];
  communications: URMSCommunicationMessage[];
  documents: URMSDocumentItem[];
  commercialWorkflow?: CustomerSafeCommercialWorkflow | null;
}

export const ALLOWED_STATUS_TRANSITIONS: Record<URMSStatus, URMSStatus[]> = {
  SUBMITTED: ['ACKNOWLEDGED', 'REJECTED', 'CANCELLED'],
  ACKNOWLEDGED: ['UNDER_REVIEW', 'ASSIGNED', 'CANCELLED'],
  ASSIGNED: ['UNDER_REVIEW', 'IN_PROGRESS', 'SCHEDULED', 'CANCELLED'],
  UNDER_REVIEW: ['WAITING_FOR_CUSTOMER', 'APPROVED', 'REJECTED', 'ASSIGNED'],
  WAITING_FOR_CUSTOMER: ['UNDER_REVIEW', 'APPROVED', 'CANCELLED'],
  APPROVED: ['SCHEDULED', 'IN_PROGRESS', 'CANCELLED'],
  SCHEDULED: ['IN_PROGRESS', 'CANCELLED'],
  IN_PROGRESS: ['COMPLETED', 'RESOLVED', 'WAITING_FOR_CUSTOMER'],
  COMPLETED: ['RESOLVED', 'CLOSED'],
  RESOLVED: ['CLOSED'],
  CLOSED: [],
  REJECTED: ['CLOSED'],
  CANCELLED: ['CLOSED'],
};

export function validateStatusTransition(current: URMSStatus, next: URMSStatus): boolean {
  if (current === next) return true;
  const allowed = ALLOWED_STATUS_TRANSITIONS[current] || [];
  return allowed.includes(next);
}

// Role-aware security filter for public / customer tracking views
export function getCustomerSafeRecord(record: URMSUniversalRecord): URMSUniversalRecord {
  return {
    ...record,
    assignedUser: undefined, // Hide private individual admin assignment
    history: record.history.map((h) => ({
      ...h,
      internalNote: undefined, // Hide internal admin notes
    })),
    timeline: record.timeline.filter((t) => t.isPublic), // Exclude internal timeline events
    communications: record.communications.filter((c) => c.visibility === 'CUSTOMER_VISIBLE'),
    documents: record.documents.filter((d) => d.visibility === 'CUSTOMER_VISIBLE'),
  };
}
