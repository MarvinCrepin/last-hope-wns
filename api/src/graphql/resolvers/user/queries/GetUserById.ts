export default async (
  _: any,
  { userId }: { userId: string },
  context: Context
) =>
  await context.prisma.user.findUnique({
    where: { id: userId },
  });
