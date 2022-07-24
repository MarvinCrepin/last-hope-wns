import isConnected from "../../../../helpers/isConnected";
import { Context } from "../../../resolvers/types";

export default async (
  _: any,
  { userId }: { userId: string },
  context: Context
) => {
  isConnected(context.authenticatedUser);

  return await context.prisma.user.findUnique({
    where: { id: userId },
  });
};
