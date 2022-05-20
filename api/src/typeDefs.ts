import projectType from "./graphql/resolvers/project/projetTypeDefs";
import userTypeDefs from "./graphql/resolvers/user/userTypeDefs";
import notificationTypeDefs from "./graphql/resolvers/notification/notificationTypeDefs";

const typeDefs = [projectType, userTypeDefs, notificationTypeDefs];

export default typeDefs;
