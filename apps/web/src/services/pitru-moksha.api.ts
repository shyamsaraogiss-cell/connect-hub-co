import { api } from "@/lib/api";
import { BookingStatus } from "@/types/booking";
import { PitruMokshaRequest } from "@/types/pitru-moksha";

export const getPitruMokshaRequests = () => api<PitruMokshaRequest[]>("/pitru-moksha/requests");
export const processPitruMokshaRequest = (id: string, input: { religiousPartnerId?: string; scheduledAt?: string; status?: BookingStatus }) => api<PitruMokshaRequest>(`/pitru-moksha/requests/${id}/process`, { method: "PATCH", body: JSON.stringify(input) });
