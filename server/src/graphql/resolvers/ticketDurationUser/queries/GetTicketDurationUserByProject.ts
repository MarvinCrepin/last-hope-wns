import isConnected from "../../../../helpers/isConnected";
import { Context } from "../../types";

export default async (
  _: any,
  { projectId }: { projectId: string },
  context: Context
) => {
  isConnected(context.authenticatedUser);

  const project = await context.prisma.project.findUnique({
    where: { id: projectId },
  });

  if (!project) {
    throw new Error("Project not found");
  }

  let lastWeek: string | number = Date.now() - 168 * 60 * 60 * 1000;
  lastWeek = new Date(lastWeek).toISOString();

  const ticketDurationUser = await context.prisma.ticketDurationUser.findMany({
    where: {
      AND: [
        {
          created_at: {
            gte: lastWeek,
          },
        },
        { project_id: projectId },
      ],
    },

    include: {
      ticket: true,
      user: true,
    },
  });

  return {
    ticketDurationUser,
    totalTime: ticketDurationUser.reduce(
      (totalTime: number, ticketDurationUser: { minute_passed: number }) =>
        totalTime + ticketDurationUser.minute_passed,
      0
    ),
  };
};
