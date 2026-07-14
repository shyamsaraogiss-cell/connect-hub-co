import { api } from "@/lib/api";
import { BookingStatus } from "@/types/booking";
import { PitruMokshaInput, PitruMokshaRequest } from "@/types/pitru-moksha";

export const submitPitruMokshaRequest = (input: PitruMokshaInput) => api<{ requestId: string; bookingId: string }>("/public/pitru-moksha/requests", { method: "POST", body: JSON.stringify(input) });
export const getPitruMokshaRequests = () => api<PitruMokshaRequest[]>("/pitru-moksha/requests");
export const processPitruMokshaRequest = (id: string, input: { religiousPartnerId?: string; scheduledAt?: string; status?: BookingStatus }) => api<PitruMokshaRequest>(`/pitru-moksha/requests/${id}/process`, { method: "PATCH", body: JSON.stringify(input) });
