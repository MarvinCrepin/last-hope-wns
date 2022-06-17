export default async (
  _: any,
  { projectId, data }: { projectId: string; data: any },
  context: Context
) => {
  const oldData = await context.prisma.project.findUnique({
    where: { id: projectId },
  });

  for (const property in data) {
    if (
      property === "start_at" ||
      property === "end_at" ||
      property === "due_at"
    ) {
      data[property] = new Date(data[property]);
    }
  }

  const newData = { ...oldData, ...data };

  return await context.prisma.project.update({
    where: {
      id: projectId,
    },
    data: newData,
  });
};
