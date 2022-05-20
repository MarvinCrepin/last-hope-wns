import notificationResolver from "./notification/notification";
import projectResolvers from "./project/project";
import userResolver from "./user/user";

const resolvers = [projectResolvers, userResolver, notificationResolver];

export default resolvers;
