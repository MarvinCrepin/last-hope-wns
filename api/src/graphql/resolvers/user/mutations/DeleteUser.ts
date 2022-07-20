import isConnected from "../../../../helpers/isConnected";
import { Context } from "../../../resolvers/types";

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
  return deleteUser;
};
