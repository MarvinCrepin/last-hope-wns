export default async (_obj: any, _args: any, context: Context) => {
  const result: State[] = await context.prisma.state.findMany();
  return result;
};
