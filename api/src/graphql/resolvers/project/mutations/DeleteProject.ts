import isConnected from "../../../../helpers/isConnected";
import createNotification from "../../../../helpers/createNotification";
import { Context } from "../../../resolvers/types";

export default async (
  _: any,
  { projectId }: { projectId: string },
  context: Context
) => {
  isConnected(context.authenticatedUser);

  const deleteProject = await context.prisma.project.delete({
    where: {
      id: projectId,
    },
  });

  const notificationTitle = "Project deleted";
  const notificationContent = `The project ${deleteProject.title}, you are working on, has been deleted.`;
  const notificationType = "project";

  const notification = await createNotification(
    notificationTitle,
    notificationContent,
    notificationType,
    context,
    deleteProject.product_owner_id
  );
  console.log(notification)

  return deleteProject;
};
