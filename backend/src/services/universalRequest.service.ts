import { randomInt } from "crypto";
import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";

export const CUSTOMER_SAFE_SELECT = {
  id: true,
  referenceId: true,
  requestType: true,
  serviceDomain: true,
  guestName: true,
  title: true,
  currentStatus: true,
  currentStage: true,
  assignedTeam: true,
  publicNote: true,
  completedAt: true,
  createdAt: true,
  updatedAt: true,
  history: {
    orderBy: { createdAt: "desc" as const },
    select: {
      id: true,
      previousStatus: true,
      newStatus: true,
      previousStage: true,
      newStage: true,
      changedByRole: true,
      publicNote: true,
      createdAt: true,
    },
  },
} as const;

async function issueReferenceId(): Promise<string> {
  const year = new Date().getFullYear();
  for (let attempt = 0; attempt < 10; attempt += 1) {
    const referenceId = `CHC-${year}-${randomInt(100000, 1000000)}`;
    const exists = await prisma.universalRequest.findUnique({ where: { referenceId }, select: { id: true } });
    if (!exists) return referenceId;
  }
  throw new Error("Unable to issue a unique request reference.");
}

export interface CreateUniversalRequestInput {
  requestType: string;
  serviceDomain?: string;
  guestName: string;
  guestPhone?: string;
  guestEmail?: string;
  title: string;
  description: string;
  assignedTeam?: string;
  priority?: string;
  sourceChannel?: string;
  metadata?: Prisma.InputJsonValue;
}

export async function createUniversalRequest(input: CreateUniversalRequestInput, customerId?: string) {
  const referenceId = await issueReferenceId();
  return prisma.universalRequest.create({
    data: {
      referenceId,
      requestType: input.requestType,
      serviceDomain: input.serviceDomain,
      customerId,
      guestName: input.guestName,
      guestPhone: input.guestPhone ?? "",
      guestEmail: input.guestEmail ?? "",
      title: input.title,
      description: input.description,
      assignedTeam: input.assignedTeam ?? "Operations",
      priority: input.priority ?? "MEDIUM",
      sourceChannel: input.sourceChannel ?? "WEBSITE_FORM",
      publicNote: "Request received. The assigned team will review it.",
      metadata: input.metadata,
      history: {
        create: {
          newStatus: "SUBMITTED",
          newStage: "Submitted",
          changedByUserId: customerId,
          changedByRole: customerId ? "CUSTOMER" : "GUEST",
          publicNote: "Request submitted.",
        },
      },
    },
    select: CUSTOMER_SAFE_SELECT,
  });
}

export function listUniversalRequests() {
  return prisma.universalRequest.findMany({ orderBy: { createdAt: "desc" } });
}

export function getCustomerRequest(referenceId: string, customerId: string) {
  return prisma.universalRequest.findFirst({
    where: { referenceId, customerId },
    select: CUSTOMER_SAFE_SELECT,
  });
}

export function getPartnerRequest(referenceId: string, partnerUserId: string) {
  return prisma.universalRequest.findFirst({
    where: { referenceId, assignedPartnerUserId: partnerUserId },
    select: CUSTOMER_SAFE_SELECT,
  });
}

export function listCustomerRequests(customerId: string) {
  return prisma.universalRequest.findMany({
    where: { customerId },
    orderBy: { createdAt: "desc" },
    select: CUSTOMER_SAFE_SELECT,
  });
}

export function listPartnerAssignments(partnerUserId: string) {
  return prisma.universalRequest.findMany({
    where: { assignedPartnerUserId: partnerUserId },
    orderBy: { updatedAt: "desc" },
    select: CUSTOMER_SAFE_SELECT,
  });
}

export function listEligiblePartners() {
  return prisma.user.findMany({
    where: {
      role: "RELIGIOUS_PARTNER",
      isActive: true,
      religiousPartnerProfile: {
        is: {
          identityVerified: true,
          addressVerified: true,
          qualificationVerified: true,
          status: "Active",
        },
      },
    },
    select: {
      id: true,
      fullName: true,
      religiousPartnerProfile: {
        select: { id: true, category: true, preferredServiceArea: true },
      },
    },
  });
}

export function getRequestForAdmin(referenceId: string) {
  return prisma.universalRequest.findUnique({ where: { referenceId } });
}

export function trackGuestRequest(referenceId: string, contactVerification: string) {
  const value = contactVerification.trim().toLowerCase();
  return prisma.universalRequest.findFirst({
    where: {
      referenceId,
      OR: [{ guestEmail: { equals: value, mode: "insensitive" } }, { guestPhone: contactVerification.trim() }],
    },
    select: CUSTOMER_SAFE_SELECT,
  });
}

export async function updateRequestByAdmin(referenceId: string, input: {
  currentStatus?: string;
  currentStage?: string;
  assignedTeam?: string;
  assignedPartnerUserId?: string | null;
  publicNote?: string | null;
  internalNote?: string | null;
}, actor?: { id: string; role: string }) {
  const existing = await prisma.universalRequest.findUnique({ where: { referenceId }, select: { currentStatus: true, currentStage: true } });
  if (!existing) throw new Error("REQUEST_NOT_FOUND");
  const transitions: Record<string, string[]> = {
    SUBMITTED: ["ACKNOWLEDGED", "REJECTED", "CANCELLED"],
    ACKNOWLEDGED: ["UNDER_REVIEW", "ASSIGNED", "CANCELLED"],
    ASSIGNED: ["UNDER_REVIEW", "IN_PROGRESS", "SCHEDULED", "CANCELLED"],
    UNDER_REVIEW: ["WAITING_FOR_CUSTOMER", "APPROVED", "REJECTED", "ASSIGNED"],
    WAITING_FOR_CUSTOMER: ["UNDER_REVIEW", "APPROVED", "CANCELLED"],
    APPROVED: ["SCHEDULED", "IN_PROGRESS", "CANCELLED"],
    SCHEDULED: ["IN_PROGRESS", "CANCELLED"],
    IN_PROGRESS: ["COMPLETED", "RESOLVED", "WAITING_FOR_CUSTOMER"],
    COMPLETED: ["RESOLVED", "CLOSED"],
    RESOLVED: ["CLOSED"],
    REJECTED: ["CLOSED"],
    CANCELLED: ["CLOSED"],
    CLOSED: [],
  };
  if (input.currentStatus && input.currentStatus !== existing.currentStatus && !transitions[existing.currentStatus]?.includes(input.currentStatus)) {
    throw new Error("INVALID_STATUS_TRANSITION");
  }
  if (input.assignedPartnerUserId) {
    const partner = await prisma.user.findFirst({
      where: {
        id: input.assignedPartnerUserId,
        role: "RELIGIOUS_PARTNER",
        isActive: true,
        religiousPartnerProfile: {
          is: {
            identityVerified: true,
            addressVerified: true,
            qualificationVerified: true,
            status: "Active",
          },
        },
      },
      select: { id: true },
    });
    if (!partner) throw new Error("ASSIGNED_PARTNER_NOT_ELIGIBLE");
  }

  return prisma.$transaction(async (tx) => {
    const updated = await tx.universalRequest.update({
      where: { referenceId },
      data: {
        currentStatus: input.currentStatus,
        currentStage: input.currentStage,
        assignedTeam: input.assignedTeam,
        assignedPartnerUserId: input.assignedPartnerUserId,
        publicNote: input.publicNote,
        internalNote: input.internalNote,
        completedAt: input.currentStatus === "COMPLETED" ? new Date() : undefined,
      },
    });
    if (input.currentStatus || input.currentStage) {
      await tx.universalRequestStatusHistory.create({
        data: {
          requestId: updated.id,
          previousStatus: existing.currentStatus,
          newStatus: input.currentStatus ?? existing.currentStatus,
          previousStage: existing.currentStage,
          newStage: input.currentStage ?? updated.currentStage,
          changedByUserId: actor?.id,
          changedByRole: actor?.role ?? "ADMIN",
          publicNote: input.publicNote,
          internalNote: input.internalNote,
        },
      });
    }
    return updated;
  });
}

export async function updateRequestByPartner(referenceId: string, partnerUserId: string, status: "IN_PROGRESS" | "COMPLETED", publicNote?: string) {
  const existing = await prisma.universalRequest.findFirst({
    where: {
      referenceId,
      assignedPartnerUserId: partnerUserId,
      currentStatus: status === "COMPLETED" ? "IN_PROGRESS" : { in: ["ASSIGNED", "UNDER_REVIEW", "APPROVED", "SCHEDULED"] },
    },
  });
  if (!existing) return { count: 0 };
  await prisma.$transaction([
    prisma.universalRequest.update({
      where: { id: existing.id },
      data: {
        currentStatus: status,
        currentStage: status === "COMPLETED" ? "Completed" : "In Progress",
        publicNote,
        completedAt: status === "COMPLETED" ? new Date() : undefined,
      },
    }),
    prisma.universalRequestStatusHistory.create({
      data: {
        requestId: existing.id,
        previousStatus: existing.currentStatus,
        newStatus: status,
        previousStage: existing.currentStage,
        newStage: status === "COMPLETED" ? "Completed" : "In Progress",
        changedByUserId: partnerUserId,
        changedByRole: "RELIGIOUS_PARTNER",
        publicNote,
      },
    }),
  ]);
  return { count: 1 };
}
