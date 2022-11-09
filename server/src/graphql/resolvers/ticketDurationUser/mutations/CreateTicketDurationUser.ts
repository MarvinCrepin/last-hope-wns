import { ROLES } from "../../../../Constant";
import isAuthorizedToUpdateTicket from "../../../../helpers/isAuthorizedToUpdateTicket";
import isConnected from "../../../../helpers/isConnected";
import { Context } from "../../types";
import { TicketDurationUserInput } from "../types";

export default async (
  _parent: any,
  args: { data: TicketDurationUserInput },
  context: Context
) => {
  isConnected(context.authenticatedUser);

  const ticket = await context.prisma.ticket.findUnique({
    where: { id: args.data.ticket_id },
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

  try {
    const ticketDurationUser = await context.prisma.ticketDurationUser.create({
      data: {
        ticket_id: args.data.ticket_id,
        user_id: context.authenticatedUser.id,
        minute_passed: args.data.minute_passed,
        project_id: ticket.project.id,
      },
    });
    return ticketDurationUser;
  } catch (err) {
    throw new Error("Bad Request");
  }
};
