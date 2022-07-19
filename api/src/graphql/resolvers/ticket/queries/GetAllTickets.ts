import isConnected from "../../../../helpers/isConnected";
import { Context } from "../../../resolvers/types";

export default async (_obj: any, _args: any, context: Context) => {
  isConnected(context.authenticatedUser);

  const result = await context.prisma.ticket.findMany({
    include: {
      state: true,
      project: true,
      ticketUser: {
        include: {
          user: true,
          ticket: true,
        },
      },
    },
  });

  return result;
};
