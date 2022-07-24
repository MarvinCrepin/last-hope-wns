import { TicketUser } from "@prisma/client";
import { ApolloError, ForbiddenError } from "apollo-server-core";

import isConnected from "../../../../helpers/isConnected";
import { Context } from "../../types";
import isAuthorizedToAdminProject from "../../../../helpers/isAuthorizedToAdminProject";

export default async (_obj: any, args: any, context: Context) => {
  isConnected(context.authenticatedUser);

  const ticket = await context.prisma.ticket.findUnique({
    where: { id: args.ticketId },
    include: {
      ticketUser: true,
    },
  });

  if (!ticket) {
    throw new ApolloError("Ticket Not Found");
  }

  const isParticipant =
    ticket.ticketUser.filter((el: TicketUser) => el.userId === args.user_id)
      .length > 0;

  if (!isParticipant) {
    if (!(await isAuthorizedToAdminProject(context, ticket.project_id))) {
      throw new ForbiddenError("Not Authorized");
    }
  }

  const comments = await context.prisma.comment.findMany({
    where: {
      ticket_id: ticket.id,
    },
    include: {
      user: true,
    },
  });

  return comments;
};
