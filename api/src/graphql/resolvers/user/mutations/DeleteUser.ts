import isConnected from "../../../../helpers/isConnected";
import { Context } from "../../../resolvers/types";
import createNotification from "../../../../helpers/createNotification";

export default async (
  _: any,
  { userId }: { userId: string },
  context: Context
) => {
  isConnected(context.authenticatedUser);

  const deleteUser = await context.prisma.user.delete({
    where: {
      id: userId,
    },
  });

  const notificationTitle = `Account delete!`;
  const notificationContent = `You have deleted the account of ${deleteUser.lastname} ${deleteUser.firstname}.`;
  const notificationType = "deletion";

  createNotification(
    notificationTitle,
    notificationContent,
    notificationType,
    context,
    context.authenticatedUser.id
  );

  return deleteUser;
};
