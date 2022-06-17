export default async (
  _: any,
  { notificationId, data }: { notificationId: string; data: any },
  context: Context
) => {
  const oldData = await context.prisma.notification.findUnique({
    where: { id: notificationId },
  });
  const newData = { ...oldData, ...data };
  return await context.prisma.notification.update({
    where: {
      id: notificationId,
    },
    data: newData,
  });
};
