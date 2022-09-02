import projectType from "./project/projetTypeDefs";
import userTypeDefs from "./user/userTypeDefs";
import notificationTypeDefs from "./notification/notificationTypeDefs";
import ticketTypeDefs from "./ticket/ticketTypeDefs";
import stateTypeDefs from "./state/stateTypeDefs";
import ticketUserTypeDefs from "./ticketUser/ticketUserTypeDefs";
import projectUserTypeDefs from "./userProject/userProjectTypeDefs";
import commentTypeDefs from "./comment/commentTypeDefs";
import ticketDurationUserTypeDefs from "./ticketDurationUser/ticketDurationUserTypeDefs";

const typeDefs = [
  projectType,
  userTypeDefs,
  notificationTypeDefs,
  ticketTypeDefs,
  stateTypeDefs,
  ticketUserTypeDefs,
  projectUserTypeDefs,
  commentTypeDefs,
  ticketDurationUserTypeDefs,
];

export default typeDefs;
