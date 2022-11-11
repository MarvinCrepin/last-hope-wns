import isConnected from "../../../../helpers/isConnected";
import createNotification from "../../../../helpers/createNotification";
import { Context } from "../../../resolvers/types";

export default async (
  _: any,
  { projectId, data }: { projectId: string; data: ProjectInput },
  context: Context
) => {
  isConnected(context.authenticatedUser);

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

  const notificationTitle = "Project updated";
  const notificationContent = `The project ${newData.title}, you are working on, has been updated.`;
  const notificationType = "project";

  await createNotification(
    notificationTitle,
    notificationContent,
    notificationType,
    context,
    newData.product_owner_id
  );

  const projectUpdated = await context.prisma.project.update({
    where: {
      id: projectId,
    },
    data: newData,
    include: {
      participants: true,
    },
  });

  return projectUpdated;
};
