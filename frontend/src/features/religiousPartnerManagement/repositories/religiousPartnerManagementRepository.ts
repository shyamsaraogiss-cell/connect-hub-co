import { prisma } from "@/lib/prisma";

export async function getAllReligiousPartners() {
  return prisma.religiousPartner.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}