import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

let prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;

export const getDb = () => {
  if (!prisma) {
    prisma = new PrismaClient();
  }
  return prisma;
};
