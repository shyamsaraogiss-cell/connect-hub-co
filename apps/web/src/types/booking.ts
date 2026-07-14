import { Customer } from "@/types/customer";
import { ReligiousPartner } from "@/types/partner";
export type BookingStatus = "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
export interface Booking { id: string; customerId: string; religiousPartnerId: string | null; serviceName: string; scheduledAt: string; status: BookingStatus; notes?: string | null; customer: Customer; religiousPartner: ReligiousPartner | null; }
export interface BookingInput { customerId: string; religiousPartnerId: string; serviceName: string; scheduledAt: string; notes?: string | null; status?: BookingStatus; }
