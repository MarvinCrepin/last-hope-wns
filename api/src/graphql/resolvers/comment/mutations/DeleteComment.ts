import { ApolloError, ForbiddenError } from "apollo-server-errors";
import isAuthorizedToAdminProject from "../../../../helpers/isAuthorizedToAdminProject";
import isConnected from "../../../../helpers/isConnected";

import { Context } from "../../types";

export default async (
  _: any,
  { commentId }: { commentId: string },
  context: Context
) => {
  isConnected(context.authenticatedUser);

  const comment = await context.prisma.comment.findUnique({
    where: { id: commentId },
  });

  if (
    !(await isAuthorizedToAdminProject(context, comment.project_id)) &&
    comment.user_id !== context.authenticatedUser.id
  ) {
    throw new ForbiddenError("Not Authorized");
  }

  if (!comment) throw new ApolloError("Not Found");

  return await context.prisma.comment.delete({
    where: {
      id: commentId,
    },
  });
};
