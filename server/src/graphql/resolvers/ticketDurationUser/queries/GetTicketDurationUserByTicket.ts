import isConnected from "../../../../helpers/isConnected";
import { Context } from "../../types";
import isAuthorizedToUpdateTicket from "../../../../helpers/isAuthorizedToUpdateTicket";

export default async (
  _: any,
  { ticketId }: { ticketId: string },
  context: Context
) => {
  isConnected(context.authenticatedUser);

  const ticket = await context.prisma.ticket.findUnique({
    where: { id: ticketId },
    include: {
      ticketUser: true,
      project: true,
    },
  });

  if (!ticket) {
    throw new Error("Ticket not found");
  }

  if (!isAuthorizedToUpdateTicket(context, ticket)) {
    throw new Error("Not Authorized to update Ticket");
  }

  const ticketDurationUser = await context.prisma.ticketDurationUser.findMany({
    where: { ticket_id: ticketId },
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
