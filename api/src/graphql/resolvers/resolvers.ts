import notificationResolver from "./notification/notification";
import projectResolvers from "./project/project";
import userResolver from "./user/user";
import ticketResolver from "./ticket/ticket";

const resolvers = [
  projectResolvers,
  userResolver,
  notificationResolver,
  ticketResolver,
];

export default resolvers;
