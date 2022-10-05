import isConnected from "../../../../helpers/isConnected";
import { Context, FindManyArgs } from "../../../resolvers/types";
import { ROLES } from "../../../../Constant";

/**
 * Get all tickets
 * @param _obj
 * @param {isArchive} Si isArchive est à true, on récupère les tickets archivés
 * à false, on récupère les tickets non archivés
 * undefined, on récupère tous les tickets
 * @param context
 */
export default async (
  _obj: any,
  { isarchive }: { isarchive: boolean },
  context: Context
) => {
  isConnected(context.authenticatedUser);

  if (context.authenticatedUser.roles === ROLES.ADMIN) {
    const options: FindManyArgs = {
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
    };

    if (isarchive !== undefined) {
      options.where = {
        isArchived: isarchive,
      };
    }

    const result = await context.prisma.ticket.findMany(options);

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

  const options: FindManyArgs = {
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
  };

  if (isarchive !== undefined) {
    options.where = { ...options.where, isArchived: isarchive };
  }

  const result = await context.prisma.ticket.findMany(options);

  return result;
};
