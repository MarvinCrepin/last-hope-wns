import { ForbiddenError, UserInputError } from "apollo-server";
import isConnected from "../../../../helpers/isConnected";
import createNotification from "../../../../helpers/createNotification";
import { Context } from "../../types";
import { TicketUser } from "@prisma/client";
import isAuthorizedToAdminProject from "../../../../helpers/isAuthorizedToAdminProject";

export default async (_parent: any, args: { data: any }, context: Context) => {
  isConnected(context.authenticatedUser);

  const data = args.data;

  const ticket = await context.prisma.ticket.findUnique({
    where: { id: data.ticket_id },
    include: {
      ticketUser: true,
    },
  });

  console.log(
    ticket.ticketUser.filter((el: TicketUser) => el.userId === data.user_id)
  );

  const isParticipant =
    ticket.ticketUser.filter((el: TicketUser) => el.userId === data.user_id)
      .length > 0;

  if (!isParticipant) {
    if (!(await isAuthorizedToAdminProject(context, ticket.project_id))) {
      throw new ForbiddenError("Not Authorized");
    }
  }

  const comment = await context.prisma.comment.create({
    data: {
      ...data,
    },
  });

  const notification = {
    title: "New comment!",
    content: `New Comment at ticket: ${ticket.title}.`,
    type: "comments",
  };

  await createNotification(
    notification.title,
    notification.content,
    notification.type,
    context,
    data.userId
  );

  return comment;

  //   const notificationTitle = "New project!";
  //   const notificationContent = `You have been assigned to the project ${args.data.title}.`;
  //   const notificationType = "project";

  //   const notification = await createNotification(
  //     notificationTitle,
  //     notificationContent,
  //     notificationType,
  //     context,
  //     args.data.product_owner_id
  //   );

  //   return project;
  // } catch (err) {
  //   throw new UserInputError("Bad Request", { errors: err });
  // }
};
