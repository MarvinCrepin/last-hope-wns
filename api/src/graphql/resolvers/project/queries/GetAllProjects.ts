import isConnected from "../../../../helpers/isConnected";
import { Context } from "../../../resolvers/types";

export default async (_obj: any, _args: any, context: Context) => {
  isConnected(context.authenticatedUser);

  const result = await context.prisma.project.findMany({
    include: {
      participants: {
        include: {
          user: true,
        },
      },
      product_owner: true,
    },
  });

  return result;
};
