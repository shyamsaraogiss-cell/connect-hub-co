import { api } from '@/lib/api';
import type { CRMLead, CRMLeadInput } from '@/types/crm';
import type { BookingInput } from '@/types/booking';
import { createBooking } from './booking.api';

const endpoint = '/crm/leads';
const CRM_STORAGE_KEY = 'chc_mock_crm_leads';

const initialMockLeads: CRMLead[] = [
  {
    id: 'LEAD-901',
    customerName: 'Shyam Sharma',
    customerEmail: 'shyam@example.com',
    customerPhone: '+91 9876543210',
    customerCity: 'San Francisco',
    customerCountry: 'USA',
    isNRI: true,
    category: 'pitru-moksha-gaya',
    inquirySource: 'AI_ASSISTANT',
    inquiryId: 'PMG-88102',
    assignedAdmin: 'Senior Coordinator Acharya Ji',
    status: 'QUALIFIED',
    priority: 'HIGH',
    followUpDate: '2026-07-28',
    internalNotes: 'Family seeking complete 3-day Pind Daan rituals in Gaya Ji during Pitru Paksha. NRI travel coordination required.',
    inquiryHistory: [
      { id: 'h1', timestamp: '2026-07-25T08:30:00Z', note: 'Inquiry collected via GenZ Ritual AI', author: 'System' },
      { id: 'h2', timestamp: '2026-07-25T09:15:00Z', note: 'Initial WhatsApp contact established.', author: 'Acharya Ji' },
    ],
    ancestorDetails: 'Late Ramchandra Sharma (Grandfather)',
    gotra: 'Kashyap',
    createdAt: '2026-07-25T08:30:00Z',
    updatedAt: '2026-07-25T09:15:00Z',
  },
  {
    id: 'LEAD-902',
    customerName: 'Priya Banerjee',
    customerEmail: 'priya@example.com',
    customerPhone: '+91 9123456780',
    customerCity: 'Kolkata',
    customerCountry: 'India',
    isNRI: false,
    category: 'ritual-services',
    inquirySource: 'WEBSITE_FORM',
    inquiryId: 'RIT-44910',
    assignedAdmin: 'Ritual Desk Lead',
    status: 'FOLLOW_UP',
    priority: 'MEDIUM',
    followUpDate: '2026-07-26',
    internalNotes: 'Requested Griha Pravesh & Satyanarayan Katha for new apartment.',
    inquiryHistory: [
      { id: 'h3', timestamp: '2026-07-24T14:20:00Z', note: 'Inquiry form submitted on website.', author: 'Website' },
    ],
    createdAt: '2026-07-24T14:20:00Z',
    updatedAt: '2026-07-24T14:20:00Z',
  },
];

function getLocalLeads(): CRMLead[] {
  if (typeof window === 'undefined') return initialMockLeads;
  try {
    const raw = localStorage.getItem(CRM_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(CRM_STORAGE_KEY, JSON.stringify(initialMockLeads));
      return initialMockLeads;
    }
    return JSON.parse(raw);
  } catch {
    return initialMockLeads;
  }
}

function setLocalLeads(leads: CRMLead[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CRM_STORAGE_KEY, JSON.stringify(leads));
}

export const getCRMLeads = async (): Promise<CRMLead[]> => {
  try {
    return await api<CRMLead[]>(endpoint);
  } catch {
    return getLocalLeads();
  }
};

export const getCRMLead = async (id: string): Promise<CRMLead> => {
  try {
    return await api<CRMLead>(`${endpoint}/${id}`);
  } catch {
    const lead = getLocalLeads().find((l) => l.id === id);
    if (lead) return lead;
    throw new Error(`Lead ${id} not found.`);
  }
};

export const createCRMLead = async (input: CRMLeadInput): Promise<CRMLead> => {
  const local = getLocalLeads();
  const id = `LEAD-${Date.now().toString().slice(-6)}`;
  const now = new Date().toISOString();

  const newLead: CRMLead = {
    id,
    customerName: input.customerName,
    customerEmail: input.customerEmail,
    customerPhone: input.customerPhone,
    customerCity: input.customerCity || 'Gaya Ji',
    customerCountry: input.customerCountry || 'India',
    isNRI: Boolean(input.isNRI),
    category: input.category,
    inquirySource: input.inquirySource || 'WEBSITE_FORM',
    inquiryId: input.inquiryId,
    bookingId: input.bookingId,
    assignedAdmin: input.assignedAdmin || 'Unassigned Admin',
    status: input.status || 'NEW',
    priority: input.priority || 'MEDIUM',
    followUpDate: input.followUpDate,
    internalNotes: input.internalNotes,
    ancestorDetails: input.ancestorDetails,
    gotra: input.gotra,
    inquiryHistory: [
      {
        id: `h_${Date.now()}`,
        timestamp: now,
        note: `Lead created under status ${input.status || 'NEW'}.`,
        author: 'System',
      },
    ],
    createdAt: now,
    updatedAt: now,
  };

  try {
    const res = await api<CRMLead>(endpoint, {
      method: 'POST',
      body: JSON.stringify(input),
    });
    setLocalLeads([res, ...local]);
    return res;
  } catch {
    setLocalLeads([newLead, ...local]);
    return newLead;
  }
};

export const updateCRMLead = async (
  id: string,
  partial: Partial<CRMLeadInput> & { newNote?: string }
): Promise<CRMLead> => {
  const local = getLocalLeads();
  const index = local.findIndex((l) => l.id === id);

  if (index >= 0) {
    const existing = local[index];
    const now = new Date().toISOString();
    const updatedHistory = [...existing.inquiryHistory];

    if (partial.newNote) {
      updatedHistory.push({
        id: `h_${Date.now()}`,
        timestamp: now,
        note: partial.newNote,
        author: partial.assignedAdmin || 'Coordinator',
      });
    }

    if (partial.status && partial.status !== existing.status) {
      updatedHistory.push({
        id: `h_status_${Date.now()}`,
        timestamp: now,
        note: `Status updated from ${existing.status} to ${partial.status}.`,
        author: partial.assignedAdmin || 'Coordinator',
      });
    }

    const updated: CRMLead = {
      ...existing,
      ...partial,
      inquiryHistory: updatedHistory,
      updatedAt: now,
    };

    local[index] = updated;
    setLocalLeads(local);

    try {
      await api<CRMLead>(`${endpoint}/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(partial),
      });
    } catch {
      // Offline local update complete
    }

    return updated;
  }

  throw new Error(`Lead ${id} not found.`);
};

export const convertLeadToBooking = async (
  leadId: string,
  scheduledAt: string,
  religiousPartnerId: string
): Promise<{ lead: CRMLead; bookingId: string }> => {
  const lead = await getCRMLead(leadId);

  const bookingInput: BookingInput & { inquiryId?: string; category: CRMLead['category']; ancestorNames?: string; gotra?: string } = {
    inquiryId: lead.inquiryId || lead.id,
    category: lead.category,
    customerId: lead.customerName,
    religiousPartnerId,
    serviceName: `${lead.category.replaceAll('-', ' ').toUpperCase()} Service`,
    scheduledAt,
    notes: `Converted from CRM Lead ${lead.id}. ${lead.internalNotes || ''}`,
    status: 'PENDING',
    ancestorNames: lead.ancestorDetails,
    gotra: lead.gotra,
  };
  const booking = await createBooking(bookingInput);

  const updatedLead = await updateCRMLead(leadId, {
    status: 'CONVERTED',
    bookingId: booking.id,
    newNote: `Converted to booking ${booking.id} scheduled for ${scheduledAt}.`,
  });

  return { lead: updatedLead, bookingId: booking.id };
};
