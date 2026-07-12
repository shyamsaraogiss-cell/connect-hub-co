import { prisma } from "../lib/prisma";

export async function getDashboardSummary() {

  const [
    customers,
    religiousPartners,
    pitruRequests,
    users,
    recentCustomers,
    recentReligiousPartners,
    recentPitruRequests,
  ] = await Promise.all([

    prisma.customer.count(),

    prisma.religiousPartner.count(),

    prisma.pitruMokshaRequest.count(),

    prisma.user.count(),

    prisma.customer.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    }),

    prisma.religiousPartner.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    }),

    prisma.pitruMokshaRequest.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    }),

  ]);

  return {

    customers,

    religiousPartners,

    pitruRequests,

    users,

    recentCustomers,

    recentReligiousPartners,

    recentPitruRequests,

  };

}