import GetAllProjects from "./GetAllProjects";
import GetProjectById from "./GetProjectById";

// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();


const projectResolvers = {
  Query: {
    Projects: GetAllProjects,
    GetOneProjectById: GetProjectById,
  },

  Mutation: {
    AddProject: (_parent: any, args: { data: any }, context: any) => {
      return context.prisma.project.create({
        data: {
          title: args.data.title,
          description: args.data.description,
          start_at: new Date(args.data.start_at),
          end_at: new Date(args.data.end_at),
          due_at: new Date(args.data.due_at),
          product_owner_id: args.data.product_owner_id,
          advancement: args.data.advancement,
        },
      });
    },
    // deleteProject: async (_: any, { projectId }: { projectId: string }) => {
    //   const deleteUser = await prisma.project.delete({
    //     where: {
    //       id: projectId,
    //     },
    //   });
    //   return deleteUser;
    // },
  },
};

export default projectResolvers;
