import { prisma } from "@/lib/prisma";
import type { Customer } from "../types/customer";

export async function createCustomer(customer: Customer) {
  return prisma.customer.create({
    data: {
      id: customer.id,
      fullName: customer.fullName,
      mobile: customer.mobile,
      whatsapp: customer.whatsapp ?? null,
      email: customer.email ?? null,
      city: customer.city ?? null,
      state: customer.state ?? null,
      country: customer.country ?? null,
      purpose: customer.purpose,
      serviceType: customer.serviceType ?? null,
      status: customer.status,
      assignedTo: customer.assignedTo ?? null,
      remarks: customer.remarks ?? null,
    },
  });
}

export async function getCustomers(
  search?: string
): Promise<Customer[]> {
  const customers = await prisma.customer.findMany({
    where: search
      ? {
          OR: [
            {
              fullName: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              mobile: {
                contains: search,
              },
            },
            {
              email: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
        }
      : undefined,

    orderBy: {
      createdAt: "desc",
    },
  });

  return customers.map((customer) => ({
    id: customer.id,
    fullName: customer.fullName,
    mobile: customer.mobile,

    whatsapp: customer.whatsapp ?? undefined,
    email: customer.email ?? undefined,
    city: customer.city ?? undefined,
    state: customer.state ?? undefined,
    country: customer.country ?? undefined,

    purpose: customer.purpose,
    serviceType: customer.serviceType ?? undefined,

    status: customer.status as Customer["status"],

    assignedTo: customer.assignedTo ?? undefined,
    remarks: customer.remarks ?? undefined,

    createdAt: customer.createdAt.toISOString(),
    updatedAt: customer.updatedAt.toISOString(),
  }));
}