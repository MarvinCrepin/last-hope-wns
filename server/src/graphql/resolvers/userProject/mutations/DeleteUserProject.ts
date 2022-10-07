import { ApolloError } from "apollo-server";

import isConnected from "../../../../helpers/isConnected";
import { Context } from "../../types";
import isAuthorizedToAdminProject from "../../../../helpers/isAuthorizedToAdminProject";

export default async (_parent: any, { userProjectId }: {userProjectId: string}, context: Context) => {
  isConnected(context.authenticatedUser);

  const userProjectExist = await context.prisma.userProject.findUnique({
    where: { id: userProjectId },
    include: {
      project: true,
    }
  });

  if (!userProjectExist) {
    throw new ApolloError("Error");
  }

  if (!(await isAuthorizedToAdminProject(context, userProjectExist.project.id))) {
    throw new ApolloError("Not authorized");
  }

  try {
    const userProject = await context.prisma.userProject.delete({
      where: {
        id: userProjectExist.id 
      },
    });

    return userProject;
  } catch (err) {
    throw new ApolloError("Bad Request", { errors: err });
  }
};
