import { Context } from "../../../../context";

export default async (_obj: any, _args: any, context: Context) => {
  const result = await context.prisma.project.findMany({
    include: {
      product_owner: true,
    },
  });
  return result;
};
