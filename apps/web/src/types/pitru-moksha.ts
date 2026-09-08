import type { BookingStatus } from "@/types/booking";

export interface PitruMokshaRequest { id: string; customerName: string; phone: string; email?: string | null; city?: string | null; country: string; isNRI: boolean; contactPreference: "PHONE" | "WHATSAPP" | "EMAIL"; serviceName: string; scheduledAt: string; pilgrimCount: number; ancestorNames: string; gotra?: string | null; travelSupport: boolean; accommodationSupport: boolean; arrivalDetails?: string | null; specialRequirements?: string | null; religiousPartnerId?: string | null; status: BookingStatus; createdAt: string; }
