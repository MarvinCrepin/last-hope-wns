import isConnected from "../../../../helpers/isConnected";
import { Context } from "../../../resolvers/types";

export default async (
  _: any,
  { projectId }: { projectId: string },
  context: Context
) => {
  isConnected(context.authenticatedUser);

  const deleteProject = await context.prisma.project.delete({
    where: {
      id: projectId,
    },
  });
  return deleteProject;
};
