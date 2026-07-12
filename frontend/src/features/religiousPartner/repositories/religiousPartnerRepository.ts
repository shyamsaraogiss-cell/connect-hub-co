import { prisma } from "@/lib/prisma";

import { ReligiousPartnerRegistrationFormData } from "../validation/religiousPartnerRegistrationSchema";

export async function createReligiousPartner(
  data: ReligiousPartnerRegistrationFormData
) {
  return prisma.religiousPartner.create({
    data: {
      id: crypto.randomUUID(),

      fullName: `${data.firstName} ${data.lastName}`,

      category: data.religion,

      mobile: data.phone,

      whatsapp: data.alternatePhone ?? null,

      email: data.email,

      city: data.address.city,

      state: data.address.state,

      country: data.address.country,

      preferredServiceArea: data.address.city,

      onlineAvailable: true,

      offlineAvailable: true,

      relocationAvailable: false,

      identityVerified: false,

      addressVerified: false,

      qualificationVerified: false,

      status: "Pending",

      remarks: null,

      updatedAt: new Date(),
    },
  });
}