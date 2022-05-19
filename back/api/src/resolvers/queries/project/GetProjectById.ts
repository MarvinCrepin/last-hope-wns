import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async (_: any, { projectId }: { projectId: string }) =>
  await prisma.project.findUnique({
    where: { id: projectId },
  });
