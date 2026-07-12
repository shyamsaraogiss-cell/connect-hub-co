/**
 * Connect Hub Co.
 * Religious Partner Domain Model
 * Version: 1.0
 */

export type Gender = "male" | "female" | "other";

export type VerificationStatus =
  | "pending"
  | "approved"
  | "rejected";

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

export interface ReligiousPartner {
  // Identity
  id?: string;

  // Personal Information
  firstName: string;
  lastName: string;
  gender: Gender;
  dateOfBirth: string;

  // Contact Information
  email: string;
  phone: string;
  alternatePhone?: string;

  // Professional Information
  religion: string;
  denomination: string;

  experienceYears: number;

  languages: string[];

  specialties: string[];

  bio: string;

  // Address
  address: Address;

  // Business Settings
  availableForTravel: boolean;

  acceptsOnlineCeremonies: boolean;

  verificationStatus: VerificationStatus;

  isActive: boolean;

  // Audit Fields
  createdAt?: string;

  updatedAt?: string;
}