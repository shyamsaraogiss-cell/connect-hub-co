import { z } from "zod";

export const customerSchema = z.object({
  fullName: z
    .string()
    .min(3, "Full Name must be at least 3 characters."),

  mobile: z
    .string()
    .min(10, "Mobile number must be at least 10 digits.")
    .max(15),

  whatsapp: z.string().optional(),

  email: z
    .string()
    .email("Invalid email address.")
    .optional()
    .or(z.literal("")),

  city: z.string().optional(),

  state: z.string().optional(),

  country: z.string().optional(),

  purpose: z
    .string()
    .min(2, "Purpose is required."),

  serviceType: z.string().optional(),

  assignedTo: z.string().optional(),

  remarks: z.string().optional(),
});

export type CustomerFormData = z.infer<typeof customerSchema>;