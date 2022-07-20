import { ApolloError } from "apollo-server-core";
import { Context } from "../../types";

export default async (_: any, _args: any, context: Context) => {
  if (!context.authenticatedUser) {
    throw new ApolloError("Token not valid");
  }
  console.log(context.authenticatedUser);
  const user = await context.prisma.user.findUnique({
    where: { mail: context.authenticatedUser.mail },
  });

  if (user.role !== context.authenticatedUser.role) {
    throw new ApolloError("Token not valid");
  }

  return { user: context.authenticatedUser, error: null };
};
