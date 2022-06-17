import updateNotification from "./mutations/updateNotification";
import GetNotificationByUserId from "./queries/GetNotificationByUserId";

export default {
  Query: { GetNotificationByUserId },

  Mutation: {updateNotification},
};
