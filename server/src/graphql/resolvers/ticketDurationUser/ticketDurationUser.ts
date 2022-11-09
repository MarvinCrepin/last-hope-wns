import CreateTicketDurationUser from "./mutations/CreateTicketDurationUser";
import GetTicketDurationUserByProject from "./queries/GetTicketDurationUserByProject";
import GetTicketDurationUserByTicket from "./queries/GetTicketDurationUserByTicket";

export default {
  Mutation: {
    CreateTicketDurationUser,
  },
  Query: {
    GetTicketDurationUserByTicket,
    GetTicketDurationUserByProject,
  },
};
