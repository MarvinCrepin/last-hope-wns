import isConnected from "../../../../helpers/isConnected";
import { Context } from "../../../resolvers/types";

export default async (
  _: any,
  { projectId }: { projectId: string },
  context: Context
) => {
  isConnected(context.authenticatedUser);

  return await context.prisma.project.findUnique({
    where: { id: projectId },
    include: {
      participants: {
        include: {
          user: true,
        },
      },
    },
  });
};
