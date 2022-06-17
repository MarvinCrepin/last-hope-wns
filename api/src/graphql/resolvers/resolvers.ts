import notificationResolver from "./notification/notification";
import projectResolvers from "./project/project";
import userResolver from "./user/user";
import ticketResolver from "./ticket/ticket";
import stateResolver from "./state/state";

const resolvers = [
  projectResolvers,
  userResolver,
  notificationResolver,
  stateResolver,
  ticketResolver,
];

export default resolvers;
