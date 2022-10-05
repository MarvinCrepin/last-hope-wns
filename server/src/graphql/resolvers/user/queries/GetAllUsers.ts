import { ApolloError } from "apollo-server";
import isConnected from "../../../../helpers/isConnected";
import { Context } from "../../../resolvers/types";

export default async (_obj: any, _args: any, context: Context) => {
  isConnected(context.authenticatedUser);

  try {
    const users = await context.prisma.user.findMany({
      select: {
        id: true,
        mail: true,
        roles: true,
        firstname: true,
        lastname: true,
      },
    });
    return users;
  } catch (error) {
    console.log(error);
    throw new ApolloError("Server error");
  }
};
