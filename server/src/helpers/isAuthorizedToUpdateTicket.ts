import { Context } from "../graphql/resolvers/types";
import { ROLES } from "../Constant";

/**
 * Vérifie si un user à le droit d'update le ticket(product owner ou admin)
 * @param context context qui est passé dans le resolver
 * @param   ticket ticket à vérifier
 * @returns Boolean
 */

export default function isAuthorizedToUpdateTicket(
  context: Context,
  ticket: {
    ticketUser: [];
    project: { product_owner_id: string };
  }
) {
  if (
    ticket.ticketUser.filter(
      (ticketUser: { user_id: string }) =>
        ticketUser.user_id === context.authenticatedUser.id
    ).length === 0 &&
    context.authenticatedUser.roles !== ROLES.ADMIN
  ) {
    if (context.authenticatedUser.roles === ROLES.PRODUCT_MANAGER) {
      if (ticket.project.product_owner_id !== context.authenticatedUser.id) {
        return false;
      } else {
        return true;
      }
    }
  }

  return true;
}
