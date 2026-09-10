import { api } from '../lib/api';
import {
  type URMSRequestType,
  type URMSStatus,
  type URMSUniversalRecord,
  type URMSStatusHistoryRecord,
  type URMSAssignmentTeam,
  type CustomerQuotationDecision,
  type ExternalBankPaymentMode,
  validateStatusTransition,
  getCustomerSafeRecord,
} from '../types/urms';

const URMS_STORAGE_KEY = 'chc_urms_universal_records_registry';

let counter = 123;

export function generateUniversalReferenceId(): string {
  const year = new Date().getFullYear();
  counter += 1;
  const seq = counter.toString().padStart(6, '0');
  return `CHC-${year}-${seq}`;
}

const initialMockUniversalRecords: URMSUniversalRecord[] = [
  {
    id: 'urms_1',
    referenceId: 'CHC-2026-000123',
    requestType: 'SERVICE_REQUEST',
    relatedService: 'PitruMoksha Gaya Pind Daan Rites',
    guestName: 'Ramesh Sharma',
    guestPhone: '+91 9876543210',
    guestEmail: 'ramesh.sharma@example.com',
    currentStatus: 'ASSIGNED',
    currentStage: 'Religious Partner Assignment',
    assignedTeam: 'Operations',
    assignedUser: 'Acharya Achyutanand Ji (Verified Gaya Tirth Purohit)',
    priority: 'HIGH',
    sourceChannel: 'WEBSITE_FORM',
    title: 'Gaya Ji Ancestral Pind Daan Rites',
    description: 'Family 3-day Gaya Ji Pind Daan rituals including Phalgu River Tarpan and Akshayavat Puja.',
    expectedNextStep: 'Acharya Ji will contact family via WhatsApp to confirm sacred samagri and schedule.',
    createdAt: '2026-07-24T09:00:00Z',
    updatedAt: '2026-07-25T14:15:00Z',
    history: [
      {
        id: 'h1',
        referenceId: 'CHC-2026-000123',
        newStatus: 'SUBMITTED',
        newStage: 'Request Submission',
        changedBy: 'Customer',
        changeSource: 'CUSTOMER',
        publicNote: 'Request submitted on Connect Hub Co. platform.',
        timestamp: '2026-07-24T09:00:00Z',
      },
      {
        id: 'h2',
        referenceId: 'CHC-2026-000123',
        previousStatus: 'SUBMITTED',
        newStatus: 'ACKNOWLEDGED',
        previousStage: 'Request Submission',
        newStage: 'Operations Acknowledgment',
        changedBy: 'System',
        changeSource: 'SYSTEM',
        publicNote: 'Universal Reference ID CHC-2026-000123 acknowledged by system desk.',
        timestamp: '2026-07-24T09:05:00Z',
      },
      {
        id: 'h3',
        referenceId: 'CHC-2026-000123',
        previousStatus: 'ACKNOWLEDGED',
        newStatus: 'ASSIGNED',
        previousStage: 'Operations Acknowledgment',
        newStage: 'Religious Partner Assignment',
        changedBy: 'Senior Acharya',
        changeSource: 'ADMIN',
        publicNote: 'Assigned to Acharya Achyutanand Ji for direct ritual management.',
        internalNote: 'Vedas & Panji records verified.',
        timestamp: '2026-07-25T14:15:00Z',
      },
    ],
    timeline: [
      {
        id: 't1',
        timestamp: '2026-07-24T09:00:00Z',
        status: 'SUBMITTED',
        title: 'Universal Request Submitted',
        description: 'Universal Reference ID CHC-2026-000123 generated.',
        actor: 'Customer',
        isPublic: true,
      },
      {
        id: 't2',
        timestamp: '2026-07-25T14:15:00Z',
        status: 'ASSIGNED',
        title: 'Assigned to Verified Acharya',
        description: 'Acharya Achyutanand Ji assigned as lead Purohit.',
        actor: 'Operations Admin',
        isPublic: true,
      },
    ],
    communications: [
      {
        id: 'c1',
        referenceId: 'CHC-2026-000123',
        sender: 'Customer Desk',
        visibility: 'CUSTOMER_VISIBLE',
        channel: 'SYSTEM_NOTIFICATION',
        message: 'Your Universal Reference ID CHC-2026-000123 has been logged successfully.',
        timestamp: '2026-07-24T09:05:00Z',
      },
      {
        id: 'c2',
        referenceId: 'CHC-2026-000123',
        sender: 'Acharya Achyutanand Ji',
        visibility: 'CUSTOMER_VISIBLE',
        channel: 'WHATSAPP',
        message: 'Pranam. I have received your Gotra details for Gaya Pind Daan. Will connect shortly.',
        timestamp: '2026-07-25T14:30:00Z',
      },
      {
        id: 'c3',
        referenceId: 'CHC-2026-000123',
        sender: 'Admin Lead',
        visibility: 'INTERNAL_ONLY',
        channel: 'INTERNAL_NOTE',
        message: 'Customer requested 3-day complete package. Panji ledger record checked.',
        timestamp: '2026-07-25T14:16:00Z',
      },
    ],
    documents: [
      {
        id: 'd1',
        referenceId: 'CHC-2026-000123',
        fileName: 'Service_Scope_CHC-2026-000123.pdf',
        category: 'GENERATED_QUOTATION',
        uploadedBy: 'Operations Desk',
        visibility: 'CUSTOMER_VISIBLE',
        uploadDate: '2026-07-24T09:10:00Z',
        storageRef: 'docs/scopes/CHC-2026-000123.pdf',
      },
      {
        id: 'd2',
        referenceId: 'CHC-2026-000123',
        fileName: 'Internal_Panji_Audit.pdf',
        category: 'RITUAL_DOCUMENT',
        uploadedBy: 'Admin Desk',
        visibility: 'INTERNAL_ONLY',
        uploadDate: '2026-07-25T14:00:00Z',
        storageRef: 'internal/panji/CHC-2026-000123.pdf',
      },
    ],
  },
  {
    id: 'urms_2',
    referenceId: 'CHC-2026-000124',
    requestType: 'PARTNER_REGISTRATION',
    relatedService: 'Verified Priest Network (RPN)',
    guestName: 'Pandit Vidyadhar Shastri',
    guestPhone: '+91 9123456789',
    guestEmail: 'vidyadhar.shastri@example.com',
    currentStatus: 'UNDER_REVIEW',
    currentStage: 'Lineage Credentials Audit',
    assignedTeam: 'Religious Partner Team',
    priority: 'MEDIUM',
    sourceChannel: 'RPN_PORTAL',
    title: 'Verified Priest Network Application',
    description: 'Lineaged Purohit application with Kashi Veda Pathshala credentials.',
    expectedNextStep: 'Verification officer will complete reference checks within 48 hours.',
    createdAt: '2026-07-25T10:00:00Z',
    updatedAt: '2026-07-25T12:00:00Z',
    history: [
      {
        id: 'h4',
        referenceId: 'CHC-2026-000124',
        newStatus: 'SUBMITTED',
        newStage: 'Application Submission',
        changedBy: 'Applicant',
        changeSource: 'WORKFLOW',
        publicNote: 'RPN application submitted.',
        timestamp: '2026-07-25T10:00:00Z',
      },
      {
        id: 'h5',
        referenceId: 'CHC-2026-000124',
        previousStatus: 'SUBMITTED',
        newStatus: 'UNDER_REVIEW',
        previousStage: 'Application Submission',
        newStage: 'Lineage Credentials Audit',
        changedBy: 'Verification Officer',
        changeSource: 'ADMIN',
        publicNote: 'Lineage & certificate verification in progress.',
        timestamp: '2026-07-25T12:00:00Z',
      },
    ],
    timeline: [
      {
        id: 't3',
        timestamp: '2026-07-25T10:00:00Z',
        status: 'SUBMITTED',
        title: 'Registration Application Submitted',
        description: 'Universal Reference ID CHC-2026-000124 assigned.',
        actor: 'Applicant',
        isPublic: true,
      },
    ],
    communications: [
      {
        id: 'c4',
        referenceId: 'CHC-2026-000124',
        sender: 'Priest Verification Desk',
        visibility: 'CUSTOMER_VISIBLE',
        channel: 'EMAIL',
        message: 'Your RPN Application CHC-2026-000124 is under document verification.',
        timestamp: '2026-07-25T10:05:00Z',
      },
    ],
    documents: [
      {
        id: 'd3',
        referenceId: 'CHC-2026-000124',
        fileName: 'Veda_Certificate.pdf',
        category: 'REGISTRATION_DOCUMENT',
        uploadedBy: 'Applicant',
        visibility: 'CUSTOMER_VISIBLE',
        uploadDate: '2026-07-25T10:00:00Z',
        storageRef: 'docs/rpn/CHC-2026-000124_cert.pdf',
      },
    ],
  },
];

let inMemoryRecordsFallback: URMSUniversalRecord[] = [...initialMockUniversalRecords];

type ServerHistoryRecord = Partial<URMSStatusHistoryRecord> & {
  changedByRole?: string;
  createdAt?: string;
};

type ServerUniversalRecord = Omit<Partial<URMSUniversalRecord>, 'history'> & Pick<URMSUniversalRecord, 'id' | 'referenceId' | 'requestType' | 'title' | 'currentStatus' | 'currentStage' | 'createdAt' | 'updatedAt'> & {
  serviceDomain?: string;
  publicNote?: string | null;
  history?: ServerHistoryRecord[];
};

export interface QuotationDecisionRequest {
  quotationId: string;
  decision: CustomerQuotationDecision;
  changeRequest?: string;
  contactVerification: string;
}

export interface AgreementAcceptanceRequest {
  agreementId: string;
  agreementVersion: number;
  contactVerification: string;
}

export interface CustomerPaymentDetailsRequest {
  amountPaid: string;
  paymentDate: string;
  externalReference: string;
  paymentMode: ExternalBankPaymentMode;
  payerName: string;
  remarks?: string;
  contactVerification: string;
}

function normalizeServerRecord(record: ServerUniversalRecord): URMSUniversalRecord {
  return {
    ...record,
    relatedService: record.relatedService ?? record.serviceDomain,
    guestName: record.guestName ?? 'Customer',
    guestPhone: record.guestPhone ?? '',
    guestEmail: record.guestEmail ?? '',
    priority: record.priority ?? 'MEDIUM',
    sourceChannel: record.sourceChannel ?? 'WEBSITE_FORM',
    expectedNextStep: record.expectedNextStep ?? record.publicNote ?? undefined,
    history: (record.history ?? []).map((item) => ({
      id: item.id ?? `history_${record.referenceId}`,
      referenceId: record.referenceId,
      previousStatus: item.previousStatus,
      newStatus: item.newStatus ?? record.currentStatus,
      previousStage: item.previousStage,
      newStage: item.newStage ?? record.currentStage,
      changedBy: item.changedBy ?? item.changedByRole ?? 'SYSTEM',
      changeSource: item.changeSource ?? (item.changedByRole === 'RELIGIOUS_PARTNER' ? 'WORKFLOW' : 'SYSTEM'),
      publicNote: item.publicNote,
      timestamp: item.timestamp ?? item.createdAt ?? record.updatedAt,
    })),
    timeline: record.timeline ?? [],
    communications: record.communications ?? [],
    documents: record.documents ?? [],
    description: record.description ?? '',
  };
}

function getStoredRecords(): URMSUniversalRecord[] {
  if (typeof window === 'undefined') return inMemoryRecordsFallback;
  try {
    const raw = localStorage.getItem(URMS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(URMS_STORAGE_KEY, JSON.stringify(initialMockUniversalRecords));
      return initialMockUniversalRecords;
    }
    return JSON.parse(raw);
  } catch {
    return inMemoryRecordsFallback;
  }
}

function saveStoredRecords(list: URMSUniversalRecord[]) {
  inMemoryRecordsFallback = list;
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(URMS_STORAGE_KEY, JSON.stringify(list));
  } catch {
    // Ignore quota errors
  }
}

export async function createUniversalRequest(input: {
  requestType: URMSRequestType;
  relatedService?: string;
  guestName: string;
  guestPhone: string;
  guestEmail: string;
  title: string;
  description: string;
  sourceChannel?: string;
  parentReferenceId?: string;
  metadata?: Record<string, unknown>;
}): Promise<URMSUniversalRecord> {
  const refId = generateUniversalReferenceId();
  const now = new Date().toISOString();

  let team: URMSAssignmentTeam = 'Operations';
  if (input.requestType === 'PARTNER_REGISTRATION') team = 'Religious Partner Team';
  if (input.requestType === 'COMPLAINT' || input.requestType === 'GRIEVANCE') team = 'Support';
  if (input.requestType === 'FOUNDER_SUPPORT') team = 'Founder';

  const newRecord: URMSUniversalRecord = {
    id: `urms_${Date.now()}`,
    referenceId: refId,
    requestType: input.requestType,
    relatedService: input.relatedService,
    guestName: input.guestName,
    guestPhone: input.guestPhone,
    guestEmail: input.guestEmail,
    title: input.title,
    description: input.description,
    currentStatus: 'SUBMITTED',
    currentStage: 'Submitted',
    assignedTeam: team,
    priority: input.requestType === 'FOUNDER_SUPPORT' ? 'URGENT' : 'MEDIUM',
    sourceChannel: input.sourceChannel || 'WEBSITE_FORM',
    parentReferenceId: input.parentReferenceId,
    expectedNextStep: 'Universal Reference ID logged. Assigned team will acknowledge within 24 hours.',
    createdAt: now,
    updatedAt: now,
    metadata: input.metadata,
    history: [
      {
        id: `h_${Date.now()}`,
        referenceId: refId,
        newStatus: 'SUBMITTED',
        newStage: 'Submitted',
        changedBy: input.guestName,
        changeSource: 'CUSTOMER',
        publicNote: `Universal Request submitted under reference ID ${refId}.`,
        timestamp: now,
      },
    ],
    timeline: [
      {
        id: `t_${Date.now()}`,
        timestamp: now,
        status: 'SUBMITTED',
        title: 'Request Created',
        description: `Universal Reference ID ${refId} issued.`,
        actor: 'Customer',
        isPublic: true,
      },
    ],
    communications: [
      {
        id: `c_${Date.now()}`,
        referenceId: refId,
        sender: 'Connect Hub Co. System',
        visibility: 'CUSTOMER_VISIBLE',
        channel: 'SYSTEM_NOTIFICATION',
        message: `Universal Reference ID ${refId} created and routed to ${team}.`,
        timestamp: now,
      },
    ],
    documents: [],
  };

  const res = await api<ServerUniversalRecord>('/urms/universal-requests/public', {
    method: 'POST',
    body: JSON.stringify(newRecord),
  });
  return normalizeServerRecord(res);
}

export async function updateUniversalRequestStatus(
  referenceId: string,
  newStatus: URMSStatus,
  newStage: string,
  changedBy: string,
  publicNote?: string,
  internalNote?: string
): Promise<URMSUniversalRecord> {
  const updated = await api<ServerUniversalRecord>(`/urms/universal-requests/${referenceId}`, {
    method: 'PATCH',
    body: JSON.stringify({ currentStatus: newStatus, currentStage: newStage, changedBy, publicNote, internalNote }),
  });
  return normalizeServerRecord(updated);
}

export async function getUniversalRequestByReferenceId(
  referenceId: string,
  role: 'GUEST' | 'CUSTOMER' | 'ADMIN' = 'GUEST',
  contactVerification?: string
): Promise<URMSUniversalRecord | null> {
  const cleanId = referenceId.trim().toUpperCase();
  let found: URMSUniversalRecord | null = null;
  try {
    found = role === 'GUEST'
      ? normalizeServerRecord(await api<ServerUniversalRecord>('/urms/universal-requests/track', {
          method: 'POST',
          body: JSON.stringify({ referenceId: cleanId, contactVerification }),
        }))
      : normalizeServerRecord(await api<ServerUniversalRecord>(`/urms/universal-requests/${cleanId}`));
  } catch {
    return null;
  }

  if (!found) return null;

  // Apply role-aware security filter for public / guest views
  if (role === 'GUEST' || role === 'CUSTOMER') {
    return getCustomerSafeRecord(found);
  }

  return found;
}

export async function submitQuotationDecision(referenceId: string, input: QuotationDecisionRequest): Promise<void> {
  await api(`/urms/universal-requests/${referenceId.trim().toUpperCase()}/quotation-decision`, {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export async function submitAgreementAcceptance(referenceId: string, input: AgreementAcceptanceRequest): Promise<void> {
  await api(`/urms/universal-requests/${referenceId.trim().toUpperCase()}/agreement-acceptance`, {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export async function submitCustomerPaymentDetails(referenceId: string, input: CustomerPaymentDetailsRequest): Promise<void> {
  await api(`/urms/universal-requests/${referenceId.trim().toUpperCase()}/payment-details`, {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export async function verifyUniversalReferenceOwnership(
  referenceId: string,
  registeredContacts: readonly string[],
  allowedRequestTypes?: readonly URMSRequestType[]
): Promise<boolean> {
  for (const contact of registeredContacts.map((value) => value.trim()).filter(Boolean)) {
    const record = await getUniversalRequestByReferenceId(referenceId, 'GUEST', contact);
    if (record && (!allowedRequestTypes || allowedRequestTypes.includes(record.requestType))) return true;
  }
  return false;
}

export async function listUniversalRequests(): Promise<URMSUniversalRecord[]> {
  return api<URMSUniversalRecord[]>('/urms/universal-requests');
}
