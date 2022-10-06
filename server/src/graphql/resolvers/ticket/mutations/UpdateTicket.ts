import isConnected from "../../../../helpers/isConnected";
import { Context } from "../../../resolvers/types";
import createNotification from "../../../../helpers/createNotification";
import { TicketInputPatch } from "../types";

export default async (
  _: any,
  { ticketId, data }: { ticketId: string; data: TicketInputPatch },
  context: Context
) => {
  isConnected(context.authenticatedUser);

  const oldData = await context.prisma.ticket.findUnique({
    where: { id: ticketId },
  });

  let participants = await context.prisma.ticket.findUnique({
    where: { id: ticketId },
    include: {
      ticketUser: true,
    },
  });
  participants = participants.ticketUser;

  for (const property in data) {
    if (property === "due_at") {
      data[property] = new Date(data[property]);
    }
  }

  const newData = { ...oldData, ...data };
  const notificationTitle = "Task updated";
  const notificationContent = `The task ${newData.title}, you are working on, has been updated.`;
  const notificationType = "task";

  await participants.forEach((participant: any) => {
    createNotification(
      notificationTitle,
      notificationContent,
      notificationType,
      context,
      participant.userId
    );
  });

  return await context.prisma.ticket.update({
    where: {
      id: ticketId,
    },
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

    data: newData,
  });
};
