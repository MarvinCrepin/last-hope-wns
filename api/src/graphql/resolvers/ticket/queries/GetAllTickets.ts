import { Context } from "../../../../context";

export default async (_obj: any, _args: any, context: Context) => {
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
