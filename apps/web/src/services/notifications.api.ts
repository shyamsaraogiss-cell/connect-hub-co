import { type URMSUniversalRecord } from '@/types/urms';

export type URMSNotificationEventType =
  | 'REQUEST_SUBMITTED'
  | 'REQUEST_ACKNOWLEDGED'
  | 'ASSIGNMENT'
  | 'STATUS_CHANGED'
  | 'CUSTOMER_ACTION_REQUIRED'
  | 'DOCUMENT_REQUESTED'
  | 'APPROVED'
  | 'SCHEDULED'
  | 'COMPLETED'
  | 'RESOLVED'
  | 'CLOSED'
  | 'FOUNDER_RESPONSE';

export interface URMSNotificationLogItem {
  id: string;
  referenceId: string;
  eventType: URMSNotificationEventType;
  recipientEmail: string;
  recipientPhone?: string;
  channel: 'EMAIL' | 'WHATSAPP' | 'SYSTEM';
  status: 'PENDING_EXTERNAL_PROVIDER' | 'SENT' | 'DELIVERED';
  message: string;
  createdAt: string;
}

const notificationQueue: URMSNotificationLogItem[] = [];

export function dispatchURMSNotification(
  record: URMSUniversalRecord,
  eventType: URMSNotificationEventType,
  customMessage?: string
): URMSNotificationLogItem {
  const now = new Date().toISOString();
  const id = `notif_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

  let msg = customMessage || `Notification event ${eventType} triggered for reference ID ${record.referenceId}.`;
  if (eventType === 'REQUEST_SUBMITTED') {
    msg = `Namaste ${record.guestName}, your request (Ref ID: ${record.referenceId}) has been received on Connect Hub Co.`;
  } else if (eventType === 'ASSIGNMENT') {
    msg = `Your request ${record.referenceId} has been assigned to ${record.assignedTeam || 'Operations'}.`;
  } else if (eventType === 'STATUS_CHANGED') {
    msg = `Status update for ${record.referenceId}: Current status is now ${record.currentStatus}. Stage: ${record.currentStage}`;
  } else if (eventType === 'FOUNDER_RESPONSE') {
    msg = `Executive Founder response added for request ${record.referenceId}.`;
  }

  const logEntry: URMSNotificationLogItem = {
    id,
    referenceId: record.referenceId,
    eventType,
    recipientEmail: record.guestEmail,
    recipientPhone: record.guestPhone,
    channel: 'SYSTEM',
    status: 'PENDING_EXTERNAL_PROVIDER',
    message: msg,
    createdAt: now,
  };

  notificationQueue.push(logEntry);
  return logEntry;
}

export function getNotificationLogsByReferenceId(referenceId: string): URMSNotificationLogItem[] {
  return notificationQueue.filter((item) => item.referenceId.toUpperCase() === referenceId.toUpperCase());
}
