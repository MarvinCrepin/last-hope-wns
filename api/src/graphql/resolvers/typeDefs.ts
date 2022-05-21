import projectType from "./project/projetTypeDefs";
import userTypeDefs from "./user/userTypeDefs";
import notificationTypeDefs from "./notification/notificationTypeDefs";
import ticketTypeDefs from "./ticket/ticketTypeDefs";
import stateTypeDefs from "./state/stateTypeDefs";
import ticketUserTypeDefs from "./ticketUser/ticketUserTypeDefs";

const typeDefs = [
  projectType,
  userTypeDefs,
  notificationTypeDefs,
  ticketTypeDefs,
  stateTypeDefs,
  ticketUserTypeDefs,
];

export default typeDefs;
