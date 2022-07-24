import isConnected from "../../../../helpers/isConnected";
import { Context } from "../../../resolvers/types";

export default async (_obj: any, _args: any, context: Context) => {
  isConnected(context.authenticatedUser);

  const result: State[] = await context.prisma.state.findMany();

  return result;
};
