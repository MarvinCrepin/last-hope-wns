import notificationResolver from "./notification/notification";
import projectResolvers from "./project/project";
import userResolver from "./user/user";
import ticketResolver from "./ticket/ticket";
import stateResolver from "./state/state";
import ticketUserResolver from "./ticketUser/ticketUser";
import commentResolver from "./comment/comment";
import ticketDurationUserResolver from "./ticketDurationUser/ticketDurationUser";

const resolvers = [
  projectResolvers,
  userResolver,
  notificationResolver,
  stateResolver,
  ticketResolver,
  ticketUserResolver,
  commentResolver,
  ticketDurationUserResolver,
];

export default resolvers;
