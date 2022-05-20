import { Context } from "../../../../context";

export default async (
  _obj: any,
  { userId }: { userId: string },
  context: Context
) => {
  const result = await context.prisma.notfications.findMany({
    where: { user_id: userId },
  });

  return result;
};
