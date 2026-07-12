import { PrismaClient } from "@prisma/client";
import {
  CreateCustomerDTO,
  UpdateCustomerDTO,
} from "../types/customer";

const prisma = new PrismaClient();

export async function getCustomers() {
  return prisma.customer.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getCustomer(id: string) {
  return prisma.customer.findUnique({
    where: {
      id,
    },
  });
}

export async function createCustomer(
  data: CreateCustomerDTO
) {
  return prisma.customer.create({
    data: {
      fullName: data.fullName,
      mobile: data.mobile,
      whatsapp: data.whatsapp,
      email: data.email,

      city: data.city,
      state: data.state,
      country: data.country,

      purpose: data.purpose,
      serviceType: data.serviceType,

      status: data.status ?? "New",
      assignedTo: data.assignedTo,

      remarks: data.remarks,
    },
  });
}

export async function updateCustomer(
  id: string,
  data: UpdateCustomerDTO
) {
  return prisma.customer.update({
    where: {
      id,
    },
    data,
  });
}

export async function deleteCustomer(id: string) {
  return prisma.customer.delete({
    where: {
      id,
    },
  });
}