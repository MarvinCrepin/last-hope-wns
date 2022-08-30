import isConnected from "../../../../helpers/isConnected";
import { Context } from "../../../resolvers/types";
import { ROLES } from "../../../../Constant";

export default async (_obj: any, _args: any, context: Context) => {
  isConnected(context.authenticatedUser);

  if (context.authenticatedUser.roles === ROLES.ADMIN) {
    const result = await context.prisma.project.findMany({
      include: {
        participants: {
          include: {
            user: true,
          },
        },
        product_owner: true,
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

  const result = await context.prisma.project.findMany({
    where: {
      id: {
        in: projectsId,
      },
    },
    include: {
      participants: {
        include: {
          user: true,
        },
      },
      product_owner: true,
    },
  });

  return result;
};
