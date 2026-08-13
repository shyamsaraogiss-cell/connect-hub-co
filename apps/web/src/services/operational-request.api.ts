import { api } from '@/lib/api';

export interface OperationalRequest {
  id: string;
  referenceId: string;
  requestType: string;
  serviceDomain?: string | null;
  guestName?: string;
  title: string;
  currentStatus: string;
  currentStage: string;
  assignedTeam?: string | null;
  publicNote?: string | null;
  assignedPartnerUserId?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface EligiblePartner {
  id: string;
  fullName: string;
  religiousPartnerProfile: {
    id: string;
    category: string;
    preferredServiceArea?: string | null;
  } | null;
}

export const listOperationalRequests = () => api<OperationalRequest[]>('/urms/universal-requests');
export const listOwnRequests = () => api<OperationalRequest[]>('/urms/universal-requests/mine');
export const listOwnAssignments = () => api<OperationalRequest[]>('/urms/universal-requests/assigned-to-me');
export const listEligiblePartners = () => api<EligiblePartner[]>('/urms/universal-requests/eligible-partners');

export const updateOperationalRequest = (
  referenceId: string,
  input: Partial<Pick<OperationalRequest, 'currentStatus' | 'currentStage' | 'assignedTeam' | 'publicNote' | 'assignedPartnerUserId'>>,
) => api<OperationalRequest>(`/urms/universal-requests/${referenceId}`, {
  method: 'PATCH',
  body: JSON.stringify(input),
});

export const updateAssignedRequestStatus = (
  referenceId: string,
  status: 'IN_PROGRESS' | 'COMPLETED',
  publicNote?: string,
) => api<void>(`/urms/universal-requests/${referenceId}/partner-status`, {
  method: 'PATCH',
  body: JSON.stringify({ status, publicNote }),
});
