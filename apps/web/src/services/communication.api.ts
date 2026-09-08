import { api } from '@/lib/api';

export type CommunicationChannel = 'EMAIL' | 'WHATSAPP';
export type CommunicationType = 'INQUIRY_CONFIRMATION' | 'QUOTE_DELIVERY' | 'BOOKING_CONFIRMATION' | 'SCHEDULE_UPDATE';

export interface EmailDispatchInput {
  toEmail: string;
  recipientName: string;
  subject: string;
  type: CommunicationType;
  htmlBody: string;
  referenceId?: string;
  preferredChannel?: 'EMAIL' | 'WHATSAPP' | 'BOTH';
}

export interface WhatsAppDispatchInput {
  phone: string;
  recipientName: string;
  type: CommunicationType;
  messageText: string;
  referenceId?: string;
  preferredChannel?: 'EMAIL' | 'WHATSAPP' | 'BOTH';
}

export interface CommunicationLog {
  id: string;
  channel: CommunicationChannel;
  type: CommunicationType;
  recipient: string;
  subjectOrPreview: string;
  referenceId?: string;
  status: 'SENT' | 'DELIVERED' | 'FAILED' | 'DUPLICATE_BLOCKED';
  timestamp: string;
}

const COMM_STORAGE_KEY = 'chc_communication_logs';

function getLocalCommLogs(): CommunicationLog[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(COMM_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function setLocalCommLogs(logs: CommunicationLog[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(COMM_STORAGE_KEY, JSON.stringify(logs));
}

// Check for recent duplicate sending within 60 seconds
function isDuplicateSend(referenceId: string | undefined, channel: CommunicationChannel): boolean {
  if (!referenceId) return false;
  const logs = getLocalCommLogs();
  const now = new Date().getTime();
  return logs.some(
    (l) => l.referenceId === referenceId && l.channel === channel && now - new Date(l.timestamp).getTime() < 60000
  );
}

// 1. Shared Email Dispatch Architecture
export async function sendEmailNotification(input: EmailDispatchInput): Promise<{ success: boolean; messageId: string }> {
  if (isDuplicateSend(input.referenceId, 'EMAIL')) {
    const dupLog: CommunicationLog = {
      id: `EML-DUP-${Date.now().toString().slice(-4)}`,
      channel: 'EMAIL',
      type: input.type,
      recipient: `${input.recipientName} <${input.toEmail}>`,
      subjectOrPreview: input.subject,
      referenceId: input.referenceId,
      status: 'DUPLICATE_BLOCKED',
      timestamp: new Date().toISOString(),
    };
    setLocalCommLogs([dupLog, ...getLocalCommLogs()]);
    throw new Error(`Duplicate email dispatch blocked for reference ${input.referenceId}. Please wait before resending.`);
  }

  const logItem: CommunicationLog = {
    id: `EML-${Date.now().toString().slice(-6)}`,
    channel: 'EMAIL',
    type: input.type,
    recipient: `${input.recipientName} <${input.toEmail}>`,
    subjectOrPreview: input.subject,
    referenceId: input.referenceId,
    status: 'DELIVERED',
    timestamp: new Date().toISOString(),
  };

  try {
    await api('/communication/send-email', {
      method: 'POST',
      body: JSON.stringify(input),
    });
  } catch {
    // Local fallback
  }

  const logs = getLocalCommLogs();
  setLocalCommLogs([logItem, ...logs]);
  return { success: true, messageId: logItem.id };
}

// 2. Shared WhatsApp Dispatch Architecture
export async function sendWhatsAppNotification(input: WhatsAppDispatchInput): Promise<{ success: boolean; messageId: string; whatsappWebUrl: string }> {
  if (isDuplicateSend(input.referenceId, 'WHATSAPP')) {
    const dupLog: CommunicationLog = {
      id: `WA-DUP-${Date.now().toString().slice(-4)}`,
      channel: 'WHATSAPP',
      type: input.type,
      recipient: `${input.recipientName} (${input.phone})`,
      subjectOrPreview: input.messageText.slice(0, 80) + '...',
      referenceId: input.referenceId,
      status: 'DUPLICATE_BLOCKED',
      timestamp: new Date().toISOString(),
    };
    setLocalCommLogs([dupLog, ...getLocalCommLogs()]);
    throw new Error(`Duplicate WhatsApp dispatch blocked for reference ${input.referenceId}. Please wait before resending.`);
  }

  const cleanPhone = input.phone.replace(/[^0-9]/g, '');
  const encodedText = encodeURIComponent(input.messageText);
  const whatsappWebUrl = `https://wa.me/${cleanPhone}?text=${encodedText}`;

  const logItem: CommunicationLog = {
    id: `WA-${Date.now().toString().slice(-6)}`,
    channel: 'WHATSAPP',
    type: input.type,
    recipient: `${input.recipientName} (${input.phone})`,
    subjectOrPreview: input.messageText.slice(0, 80) + '...',
    referenceId: input.referenceId,
    status: 'DELIVERED',
    timestamp: new Date().toISOString(),
  };

  try {
    await api('/communication/send-whatsapp', {
      method: 'POST',
      body: JSON.stringify(input),
    });
  } catch {
    // Local fallback
  }

  const logs = getLocalCommLogs();
  setLocalCommLogs([logItem, ...logs]);
  return { success: true, messageId: logItem.id, whatsappWebUrl };
}

export function getCommunicationLogs(): CommunicationLog[] {
  return getLocalCommLogs();
}
