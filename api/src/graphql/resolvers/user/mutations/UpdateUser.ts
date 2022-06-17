
import {Context} from '../../../resolvers/types'
export default async (
  _: any,
  { userId, data }: { userId: string; data: any },
  context: Context
) => {
  const oldData = await context.prisma.user.findUnique({
    where: { id: userId },
  });


  const newData = { ...oldData, ...data };
  return await context.prisma.user.update({
    where: {
      id: userId,
    },
    data: newData,
  });
};