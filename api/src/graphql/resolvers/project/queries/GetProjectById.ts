import {Context} from '../../../../context'

export default async (_: any, { projectId }: { projectId: string }, context: Context) =>
  await context.prisma.project.findUnique({
    where: { id: projectId },
  });
