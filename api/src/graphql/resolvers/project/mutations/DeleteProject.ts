import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async (_: any, { projectId }: { projectId: string }) => {
  const deleteProject = await prisma.project.delete({
    where: {
      id: projectId,
    },
  });
  return deleteProject;
};
