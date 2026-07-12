export * from "@/features/religiousPartnerManagement/types/religiousPartner";

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

export type Status =
  | "Pending"
  | "Approved"
  | "Rejected"
  | "Active"
  | "Inactive"
  | "New";

export type UserRole =
  | "FOUNDER"
  | "ADMIN"
  | "CUSTOMER"
  | "RELIGIOUS_PARTNER";