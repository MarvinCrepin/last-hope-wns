import isConnected from "../../../../helpers/isConnected";
import { Context } from "../../../resolvers/types";
import createNotification from "../../../../helpers/createNotification";

export default async (
  _: any,
  { userId, data }: { userId: string; data: any },
  context: Context
) => {
  isConnected(context.authenticatedUser);

  const oldData = await context.prisma.user.findUnique({
    where: { id: userId },
  });

  const newData = { ...oldData, ...data };

  const notificationTitle = "Account updated";
  const notificationContent = `Your account has been updated by ${context.authenticatedUser.lastname} ${context.authenticatedUser.firstname}.`;
  const notificationType = "user";

  createNotification(
    notificationTitle,
    notificationContent,
    notificationType,
    context,
    userId
  );

  return await context.prisma.user.update({
    where: {
      id: userId,
    },
    data: newData,
  });
};