import { z } from "zod";

/**
 * Connect Hub Co.
 * Religious Partner Registration Schema
 * Version: 1.0
 */

export const religiousPartnerRegistrationSchema = z.object({
  // Personal Information
  firstName: z
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters.")
    .max(50, "First name cannot exceed 50 characters."),

  lastName: z
    .string()
    .trim()
    .min(2, "Last name must be at least 2 characters.")
    .max(50, "Last name cannot exceed 50 characters."),

  gender: z.enum(["male", "female", "other"], {
    message: "Please select a gender.",
  }),

  dateOfBirth: z
    .string()
    .min(1, "Date of birth is required."),

  // Contact Information
  email: z
    .email("Please enter a valid email address.")
    .trim(),

  phone: z
    .string()
    .trim()
    .min(10, "Phone number must contain at least 10 digits.")
    .max(20, "Phone number cannot exceed 20 characters."),

  alternatePhone: z
    .string()
    .trim()
    .optional(),

  // Professional Information
  religion: z
    .string()
    .trim()
    .min(2, "Religion is required."),

  denomination: z
    .string()
    .trim()
    .min(2, "Denomination is required."),

  experienceYears: z
    .number()
    .min(0, "Experience cannot be negative.")
    .max(80, "Experience is too high."),

  languages: z
    .array(z.string())
    .min(1, "Select at least one language."),

  specialties: z
    .array(z.string())
    .min(1, "Select at least one specialty."),

  bio: z
    .string()
    .trim()
    .min(20, "Biography must be at least 20 characters.")
    .max(1000, "Biography cannot exceed 1000 characters."),

  // Address
  address: z.object({
    street: z
      .string()
      .trim()
      .min(2, "Street is required."),

    city: z
      .string()
      .trim()
      .min(2, "City is required."),

    state: z
      .string()
      .trim()
      .min(2, "State is required."),

    country: z
      .string()
      .trim()
      .min(2, "Country is required."),

    postalCode: z
      .string()
      .trim()
      .min(4, "Postal code is required.")
      .max(12, "Postal code is invalid."),
  }),

  // Business Settings
  availableForTravel: z.boolean(),

  acceptsOnlineCeremonies: z.boolean(),
});

export type ReligiousPartnerRegistrationFormData =
  z.infer<typeof religiousPartnerRegistrationSchema>;