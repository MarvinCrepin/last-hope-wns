import isConnected from "../../../../helpers/isConnected";
import createNotification from "../../../../helpers/createNotification";
import { Context } from "../../../resolvers/types";
import isAuthorizedToAdminProject from "../../../../helpers/isAuthorizedToAdminProject";
import { ApolloError } from "apollo-server-core";

export default async (
  _: any,
  { userTicketId }: { userTicketId: string },
  context: Context
) => {
  isConnected(context.authenticatedUser);

  const ticketUser = await context.prisma.ticketUser.findUnique({
    where: { id: userTicketId },
    include: {
      ticket: {
        include: {
          project: true,
        },
      },
    },
  });

  if (
    !(await isAuthorizedToAdminProject(context, ticketUser.ticket.project.id))
  ) {
    throw new ApolloError("Not Authorized");
  }

  const deletedTicketUser = await context.prisma.ticketUser.delete({
    where: {
      id: userTicketId,
    },
  });

  return deletedTicketUser;
};
