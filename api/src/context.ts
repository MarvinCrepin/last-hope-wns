import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const context: Context = {
  prisma: prisma,
};
