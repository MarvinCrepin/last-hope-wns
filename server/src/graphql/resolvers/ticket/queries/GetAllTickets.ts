import isConnected from "../../../../helpers/isConnected";
import { Context } from "../../../resolvers/types";
import { ROLES } from "../../../../Constant";

export default async (_obj: any, _args: any, context: Context) => {
  isConnected(context.authenticatedUser);

  if (context.authenticatedUser.roles === ROLES.ADMIN) {
    const result = await context.prisma.ticket.findMany({
      include: {
        state: true,
        project: true,
        ticketUser: {
          include: {
            user: true,
            ticket: true,
          },
        },
      },
    });

    return result;
  }

  const projectUser = await context.prisma.userProject.findMany({
    where: {
      userId: context.authenticatedUser.id,
    },
    include: {
      project: true,
    },
  });

  let projectsId: string[] = [];

  projectUser.forEach((project: any) => {
    projectsId.push(project.projectId);
  });

  const result = await context.prisma.ticket.findMany({
    where: {
      project: {
        id: {
          in: projectsId,
        },
      },
    },
    include: {
      state: true,
      project: true,
      ticketUser: {
        include: {
          user: true,
        },
      },
    },
  });

  return result;
};
