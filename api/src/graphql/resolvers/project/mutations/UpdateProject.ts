import { Context } from "../../../../context";

export default async (
  _: any,
  { projectId, data }: { projectId: string; data: any },
  context: Context
) =>
  await context.prisma.project.update({
    where: {
      id: projectId,
    },
    data: {
      title: data.title,
      description: data.description,
      start_at: new Date(data.start_at),
      end_at: new Date(data.end_at),
      due_at: new Date(data.due_at),
      product_owner_id: data.product_owner_id,
      advancement: data.advancement,
    },
  });
