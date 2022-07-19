import isConnected from "../../../../helpers/isConnected";
import { Context } from "../../../resolvers/types";

export default async (
  _: any,
  { ticketId, data }: { ticketId: string; data: TicketInputPatch },
  context: Context
) => {
  isConnected(context.authenticatedUser);

  const oldData = await context.prisma.ticket.findUnique({
    where: { id: ticketId },
  });

  for (const property in data) {
    if (property === "due_at") {
      data[property] = new Date(data[property]);
    }
  }

  const newData = { ...oldData, ...data };

  return await context.prisma.ticket.update({
    where: {
      id: ticketId,
    },
    data: newData,
  });
};
