import { Context } from "../../../../context";

export default async (
  _: any,
  { userId, data }: { userId: string; data: any },
  context: Context
) =>
  await context.prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      lastname: data.lastname,
      firstname: data.lastname,
      mail: data.mail,
      roles: data.roles
    },
  });
