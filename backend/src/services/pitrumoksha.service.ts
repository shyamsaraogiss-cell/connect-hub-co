import { PrismaClient } from "@prisma/client";

import {
  CreatePitruMokshaDTO,
  UpdatePitruMokshaDTO,
} from "../types/pitrumoksha";

const prisma = new PrismaClient();

export async function getRequests() {

  return prisma.pitruMokshaRequest.findMany({

    orderBy: {
      createdAt: "desc",
    },

  });

}

export async function getRequest(id: string) {

  return prisma.pitruMokshaRequest.findUnique({

    where: {
      id,
    },

  });

}

export async function createRequest(
  data: CreatePitruMokshaDTO
) {

  return prisma.pitruMokshaRequest.create({

    data,

  });

}

export async function updateRequest(
  id: string,
  data: UpdatePitruMokshaDTO
) {

  return prisma.pitruMokshaRequest.update({

    where: {
      id,
    },

    data,

  });

}

export async function deleteRequest(id: string) {

  return prisma.pitruMokshaRequest.delete({

    where: {
      id,
    },

  });

}