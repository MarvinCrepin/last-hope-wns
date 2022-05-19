import {Context} from '../../../../context'

export default async (_: any, { projectId }: { projectId: string }, context:Context) => {
  const deleteProject = await context.prisma.project.delete({
    where: {
      id: projectId,
    },
  });
  return deleteProject;
};
