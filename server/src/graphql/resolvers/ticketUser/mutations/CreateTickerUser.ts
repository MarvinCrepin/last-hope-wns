import { ApolloError } from "apollo-server-errors";
import createNotification from "../../../../helpers/createNotification";

import isAuthorizedToAdminProject from "../../../../helpers/isAuthorizedToAdminProject";
import isConnected from "../../../../helpers/isConnected";
import { Context } from "../../types";

export default async (
  _parent: any,
  args: { data: InputTicketUser },
  context: Context
) => {
  isConnected(context.authenticatedUser);

  const ticketExist = await context.prisma.ticketUser.findMany({
    where: {
      userId: args.data.userId,
      ticketId: args.data.ticketId,
    },
  });

  if (ticketExist.length > 0) {
    throw new ApolloError("User is already reached of ticket");
  }

  const ticket = await context.prisma.ticket.findUnique({
    where: { id: args.data.ticketId },
    include: {
      project: true,
    },
  });

  if (!ticket) throw new ApolloError("Invalid Ticket");

  if (!(await isAuthorizedToAdminProject(context, ticket.project.id))) {
    throw new ApolloError("Not Authorized");
  }

  const userForAdd = await context.prisma.user.findUnique({
    where: { id: args.data.userId },
  });

  if (!userForAdd) throw new ApolloError("Invalid user");

  try {
    const newTicketUser = await context.prisma.ticketUser.create({
      data: {
        ...args.data,
      },
      include: {
        ticket: {
          include: {
            ticketUser: true,
          },
        },
      },
    });

    const notification = {
      title: "New task!",
      content: `You have been assigned to the task ${ticket.title}.`,
      type: "task",
    };

    await createNotification(
      notification.title,
      notification.content,
      notification.type,
      context,
      newTicketUser.userId
    );

    return newTicketUser;
  } catch (err) {
    console.error(err);
    throw new ApolloError("Server Error");
  }
};
