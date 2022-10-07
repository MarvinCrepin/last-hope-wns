import { UserInputError, ApolloError } from "apollo-server";

import isConnected from "../../../../helpers/isConnected";
import { Context } from "../../types";
import isAuthorizedToAdminProject from "../../../../helpers/isAuthorizedToAdminProject";

export default async (_parent: any, args: { data: UserProjectInput }, context: Context) => {
  isConnected(context.authenticatedUser);

  const projectExist = await context.prisma.project.findUnique({
    where: { id: args.data.projectId },
  });

  if (!projectExist) {
    throw new ApolloError("Project not Found");
  }

  if (!(await isAuthorizedToAdminProject(context, args.data.projectId))) {
    throw new ApolloError("Not authorized");
  }

  const userProjectExist = await context.prisma.userProject.findMany({
    where: { userId: args.data.userId, projectId: args.data.projectId },
  });

  console.log(userProjectExist);
  
  if (userProjectExist.length > 0) {
    throw new ApolloError("User already in");
  }

  try {
    const userProject = await context.prisma.userProject.create({
      data: {
        ...args.data,
      },
      include: {
        user: true
      }
    });

    return userProject;
  } catch (err) {
    throw new UserInputError("Bad Request", { errors: err });
  }
};
