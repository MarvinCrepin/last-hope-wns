import isConnected from "../../../../helpers/isConnected";
import { Context } from "../../../resolvers/types";
import createNotification from "../../../../helpers/createNotification";

export default async (
  _: any,
  { ticketId, data }: { ticketId: string; data: TicketInputPatch },
  context: Context
) => {
  isConnected(context.authenticatedUser);

  const oldData = await context.prisma.ticket.findUnique({
    where: { id: ticketId },
    include: {
      ticketUser: {
        include: {
          user: true,
        },
      },
    },
  });

  for (const property in data) {
    if (property === "due_at") {
      data[property] = new Date(data[property]);
    }
  }

  const newData = { ...oldData, ...data };

  const notificationTitle = "Task updated";
  const notificationContent = `The task ${newData.title}, you are working on, has been updated.`;
  const notificationType = "task";

  const participants = oldData;
  console.log(participants);
  // await createNotification(
  //   notificationTitle,
  //   notificationContent,
  //   notificationType,
  //   context,
  //   newData.product_owner_id
  // );

  return await context.prisma.ticket.update({
    where: {
      id: ticketId,
    },
    include: {
      ticketUser: {
        include: {
          user: true,
        },
      },
    },
    data: newData,
  });
};
