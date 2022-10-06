import isConnected from "../../../../helpers/isConnected";
import { Context } from "../../../resolvers/types";
import isAuthorizedToAdminProject from "../../../../helpers/isAuthorizedToAdminProject";
import { ForbiddenError } from "apollo-server-core";

export default async (
  _: any,
  { ticketId }: { ticketId: string },
  context: Context
) => {
  isConnected(context.authenticatedUser);

  const task = await context.prisma.ticket.findUnique({
    where: { id: ticketId },
    include: {
      project: true,
    },
  });

  if (!(await isAuthorizedToAdminProject(context, task.project.id))) {
    throw new ForbiddenError("Not Authorized");
  }

  const deletedTicket = await context.prisma.ticket.delete({
    where: {
      id: ticketId,
    },
  });

  return deletedTicket;
};
