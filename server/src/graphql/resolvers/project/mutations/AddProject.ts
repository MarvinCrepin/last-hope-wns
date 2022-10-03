import { UserInputError, ApolloError } from "apollo-server";
import isConnected from "../../../../helpers/isConnected";
import createNotification from "../../../../helpers/createNotification";
import { Context } from "../../../resolvers/types";
import { ROLES } from "../../../../Constant";

export default async (_parent: any, args: { data: any }, context: Context) => {
  isConnected(context.authenticatedUser);

  if(context.authenticatedUser.roles !== ROLES.ADMIN && context.authenticatedUser.roles !== ROLES.PRODUCT_MANAGER ) {
    throw new ApolloError("Not authorized");
  }

  try {
    console.log(args.data);
    const project = await context.prisma.project.create({
      data: {
        ...args.data,
        start_at: new Date(args.data.start_at),
        end_at: new Date(args.data.end_at),
        participants: {
          create: [...args.data.participants]
        }
      },
    });

    const notificationTitle = "New project!";
    const notificationContent = `You have been assigned to the project ${args.data.title}.`;
    const notificationType = "project";

    const notification = await createNotification(
      notificationTitle,
      notificationContent,
      notificationType,
      context,
      args.data.product_owner_id
    );

    return project;
  } catch (err) {
    throw new UserInputError("Bad Request", { errors: err });
  }
};
