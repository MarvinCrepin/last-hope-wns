import isConnected from "../../../../helpers/isConnected";
import { Context } from "../../../resolvers/types";
import { ROLES } from "../../../../Constant";
import { ApolloError, ForbiddenError } from "apollo-server-core";

export default async (
  _: any,
  { ticketId }: { ticketId: string },
  context: Context
) => {
  isConnected(context.authenticatedUser);

  const ticketDurationUser = await context.prisma.ticket.findMany({
    where: { id: ticketId },
  });

  // if (context.authenticatedUser.roles === ROLES.ADMIN) {
  //   return ticket;
  // }

  // const projectUser = await context.prisma.userProject.findMany({
  //   where: {
  //     userId: context.authenticatedUser.id,
  //   },
  //   include: {
  //     project: true,
  //   },
  // });

  // let projectsId: string[] = [];

  // projectUser.forEach((project: any) => {
  //   projectsId.push(project.projectId);
  // });

  // if (!projectsId.includes(ticket.project.id)) {
  //   throw new ForbiddenError("Not Authorized");
  // }

  // return ticket;
};
