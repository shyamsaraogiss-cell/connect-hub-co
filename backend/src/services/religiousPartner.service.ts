import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";
import {
  CreateReligiousPartnerDTO,
  UpdateReligiousPartnerDTO,
} from "../types/religiousPartner";

export type PartnerErrorCode =
  | "PARTNER_NOT_FOUND"
  | "ACTIVE_ASSIGNMENTS_EXIST"
  | "PARTNER_USER_NOT_FOUND"
  | "PARTNER_USER_NOT_ELIGIBLE"
  | "PARTNER_USER_ALREADY_LINKED"
  | "PARTNER_ALREADY_LINKED";

export class PartnerServiceError extends Error {
  constructor(public readonly code: PartnerErrorCode) {
    super(code);
  }
}

function translatePrismaError(error: unknown): never {
  if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
    throw new PartnerServiceError("PARTNER_NOT_FOUND");
  }
  if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
    throw new PartnerServiceError("PARTNER_USER_ALREADY_LINKED");
  }
  throw error;
}

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

      identityVerified: false,
      addressVerified: false,
      qualificationVerified: false,
      status: "Pending",
    },
  });
}

export async function updateReligiousPartner(
  id: string,
  data: UpdateReligiousPartnerDTO
) {
  try {
    return await prisma.religiousPartner.update({ where: { id }, data });
  } catch (error) {
    translatePrismaError(error);
  }
}

export async function deleteReligiousPartner(id: string) {
  return prisma.religiousPartner.delete({
    where: {
      id,
    },
  });
}

export async function deactivateReligiousPartner(id: string) {
  const profile = await prisma.religiousPartner.findUnique({
    where: { id },
    select: { id: true, userId: true },
  });
  if (!profile) throw new PartnerServiceError("PARTNER_NOT_FOUND");

  if (profile.userId) {
    const activeAssignments = await prisma.universalRequest.count({
      where: {
        assignedPartnerUserId: profile.userId,
        currentStatus: { notIn: ["COMPLETED", "RESOLVED", "CLOSED", "REJECTED", "CANCELLED"] },
      },
    });
    if (activeAssignments > 0) throw new PartnerServiceError("ACTIVE_ASSIGNMENTS_EXIST");
  }

  return prisma.$transaction(async (tx) => {
    const updated = await tx.religiousPartner.update({ where: { id }, data: { status: "Inactive" } });
    if (profile.userId) await tx.user.update({ where: { id: profile.userId }, data: { isActive: false } });
    return updated;
  });
}

export async function linkReligiousPartnerUser(profileId: string, userId: string) {
  const [profile, user, linkedProfile] = await Promise.all([
    prisma.religiousPartner.findUnique({ where: { id: profileId }, select: { id: true, userId: true } }),
    prisma.user.findUnique({ where: { id: userId }, select: { id: true, role: true, isActive: true } }),
    prisma.religiousPartner.findUnique({ where: { userId }, select: { id: true } }),
  ]);
  if (!profile) throw new PartnerServiceError("PARTNER_NOT_FOUND");
  if (!user) throw new PartnerServiceError("PARTNER_USER_NOT_FOUND");
  if (user.role !== "RELIGIOUS_PARTNER" || !user.isActive) {
    throw new PartnerServiceError("PARTNER_USER_NOT_ELIGIBLE");
  }
  if (profile.userId && profile.userId !== userId) {
    throw new PartnerServiceError("PARTNER_ALREADY_LINKED");
  }
  if (linkedProfile && linkedProfile.id !== profileId) {
    throw new PartnerServiceError("PARTNER_USER_ALREADY_LINKED");
  }
  if (profile.userId === userId) {
    return prisma.religiousPartner.findUniqueOrThrow({ where: { id: profileId } });
  }
  try {
    return await prisma.religiousPartner.update({ where: { id: profileId }, data: { userId } });
  } catch (error) {
    translatePrismaError(error);
  }
}
