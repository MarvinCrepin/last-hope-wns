import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const projectResolvers = {
    Query: {
      Projects: async () => {
        const projects = await prisma.project.findMany();
        return projects;
      },
      // GetOneProjectById: async (
      //   _parent: any,
      //   args: { data: any },
      //   context: any
      // ) => {},
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
    },
  };