import { ApolloError } from "apollo-server";
import { ROLES } from "../../../../Constant";
import isConnected from "../../../../helpers/isConnected";
import { Context } from "../../../resolvers/types";

export default async (_obj: any, _args: any, context: Context) => {
  isConnected(context.authenticatedUser);

  if(context.authenticatedUser.roles !== ROLES.ADMIN && context.authenticatedUser.roles !== ROLES.PRODUCT_MANAGER ) {
    throw new ApolloError("Not authorized");
  }

  return await context.prisma.user.findMany({});
};
