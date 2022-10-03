import { ApolloError } from "apollo-server-core";
import isConnected from "../../../../helpers/isConnected";
import { Context } from "../../../resolvers/types";

import isAuthorizedToAdminProject from "../../../../helpers/isAuthorizedToAdminProject";
import { AddTicketInput } from "../types";

export default async (
  _: any,
  args: { data: AddTicketInput },
  context: Context
) => {
  isConnected(context.authenticatedUser);

  if (!(await isAuthorizedToAdminProject(context, args.data.project_id))) {
    throw new ApolloError("Not Authorized");
  }

  try {
    const ticket = await context.prisma.ticket.create({
      data: { 
        due_at: new Date(args.data.due_at),
        title: args.data.title,
        description: args.data.description,
        project_id: args.data.project_id,
        estimated_time: args.data.estimated_time,
        state_id: args.data.state_id, 
        ticketUser:{
          create:[...args.data.ticketUser]
        }
       },
       include: {
        ticketUser: true,
      },
    });

    return ticket;
  } catch (error) {
    console.log(error);
    throw new ApolloError("Server error");
  }
};
