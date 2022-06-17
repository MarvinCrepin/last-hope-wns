import { Context } from "../../../../context";

export default async (
  _: any,
  { notificationId, data }: { notificationId: string; data: NotificationInput },
  context: Context
) => {
  const oldData = await context.prisma.notifications.findUnique({
    where: { id: notificationId },
  });

  const newData = { ...oldData, ...data };

  return await context.prisma.notifications.update({
    where: {
      id: notificationId,
    },
    data: newData,
  });
};