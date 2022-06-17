export default async (
  _: any,
  { notificationId, data }: { notificationId: string; data: any },
  context: Context
) => {
  console.log(notificationId);
  
  const oldData = await context.prisma.notification.findUnique({
    where: { id: notificationId },
  });
console.log(oldData)
  const newData = { ...oldData, ...data };
  console.log(newData)
  return await context.prisma.notification.update({
    where: {
      id: notificationId,
    },
    data: newData,
  });
};