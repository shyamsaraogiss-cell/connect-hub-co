import { PrismaClient } from "@prisma/client";
import {
  CreateReligiousPartnerDTO,
  UpdateReligiousPartnerDTO,
} from "../types/religiousPartner";

const prisma = new PrismaClient();

export async function getReligiousPartners() {
  return prisma.religiousPartner.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getReligiousPartner(id: string) {
  return prisma.religiousPartner.findUnique({
    where: {
      id,
    },
  });
}

export async function createReligiousPartner(
  data: CreateReligiousPartnerDTO
) {
  return prisma.religiousPartner.create({
    data: {
      fullName: data.fullName,

      category: data.category,

      mobile: data.mobile,
      whatsapp: data.whatsapp,
      email: data.email,

      city: data.city,
      state: data.state,
      country: data.country,

      preferredServiceArea: data.preferredServiceArea,

      onlineAvailable: data.onlineAvailable ?? true,
      offlineAvailable: data.offlineAvailable ?? true,
      relocationAvailable: data.relocationAvailable ?? false,

      identityVerified: data.identityVerified ?? false,
      addressVerified: data.addressVerified ?? false,
      qualificationVerified: data.qualificationVerified ?? false,

      verificationDate: data.verificationDate,

      status: data.status ?? "Pending",

      remarks: data.remarks,
    },
  });
}

export async function updateReligiousPartner(
  id: string,
  data: UpdateReligiousPartnerDTO
) {
  return prisma.religiousPartner.update({
    where: {
      id,
    },
    data,
  });
}

export async function deleteReligiousPartner(id: string) {
  return prisma.religiousPartner.delete({
    where: {
      id,
    },
  });
}