import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async (_: any, args: { data: any }) => await prisma.project.update({
    where: {
      id: args.data.id,
    },
    data: {
        title: args.data.title,
        description: args.data.description,
        start_at: new Date(args.data.start_at),
        end_at: new Date(args.data.end_at),
        due_at: new Date(args.data.due_at),
        product_owner_id: args.data.product_owner_id,
        advancement: args.data.advancement,
    },
  })