import { Context } from "../graphql/resolvers/types";
import { ROLES } from "../Constant";

/**
 * Vérifie si un user à le droit d'administrer un projet (product owner ou admin)
 * @param context context qui est passé dans le resolver
 * @param projectId id du projet que l'on veut checked
 * @returns Boolean
 */
export default async function isAuthorizedToAdminProject(
  context: Context,
  projectId: string
) {
  const user = await context.prisma.user.findUnique({
    where: { id: context.authenticatedUser.id },
  });

  if (!user) return false;

  if (user.roles === ROLES.DEVELOPER) return false;

  console.log(user.roles);
  if (user.roles === ROLES.ADMIN) return true;

  const project = await context.prisma.project.findUnique({
    where: { id: projectId },
  });

  if (project.product_owner_id === user.id) return true;

  return false;
}
