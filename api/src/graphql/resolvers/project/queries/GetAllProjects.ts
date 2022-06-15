export default async (_obj: any, _args: any, context: Context) => {
  const result = await context.prisma.project.findMany(
    {
      include: {
        userProject: {
          include: {
            user: true,
          },
        },
      },
    });
  return result;
};
