import { ROLES } from "../../../../Constant";
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

  console.log(context.authenticatedUser);

  if (
    ticket.ticketUser.filter(
      (ticketUser: { user_id: string }) =>
        ticketUser.user_id === context.authenticatedUser.id
    ).length === 0 &&
    context.authenticatedUser.roles !== ROLES.ADMIN
  ) {
    if (context.authenticatedUser.roles === ROLES.PRODUCT_MANAGER) {
      if (ticket.project.product_owner_id !== context.authenticatedUser.id)
        throw new Error("User not authorized to update this ticket");
    } else {
      throw new Error("User not authorized to update this ticket");
    }
  }
  try {
    const ticketDurationUser = await context.prisma.ticketDurationUser.create({
      data: {
        ticket_id: args.data.ticket_id,
        user_id: context.authenticatedUser.id,
        minute_passed: args.data.minute_passed,
      },
    });
    return ticketDurationUser;
  } catch (err) {
    throw new Error("Bad Request");
  }
};
