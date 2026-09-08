import { Customer } from "@/types/customer";
import { ReligiousPartner } from "@/types/partner";
export type BookingStatus = "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
export interface Booking { id: string; customerId: string; religiousPartnerId: string | null; serviceName: string; scheduledAt: string; status: BookingStatus; notes?: string | null; customer: Customer; religiousPartner: ReligiousPartner | null; }
export interface BookingInput { customerId: string; religiousPartnerId: string; serviceName: string; scheduledAt: string; notes?: string | null; status?: BookingStatus; }
export type ParticipationFormat="ONLINE_REMOTE"|"OFFLINE_ON_SITE"|"HYBRID"|"TO_BE_GUIDED"|"";
export type ContactMethod="WHATSAPP"|"EMAIL"|"PHONE";
export interface PublicBookingInput{fullName:string;country?:string;mobile:string;whatsappNumber?:string;email:string;serviceId:string;serviceName:string;serviceCategory:string;participationFormat:ParticipationFormat;preferredLocation:string;preferredDate:string;participants:number;message:string;contactMethod:ContactMethod;consent:boolean}
export interface PublicBookingResponse{referenceId:string}
