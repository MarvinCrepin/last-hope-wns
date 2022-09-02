import CreateTicketDurationUser from "./mutations/CreateTicketDurationUser";
import GetTicketDurationUserByTicket from "./queries/GetTicketDurationUserByTicket";

export default {
  Mutation: {
    CreateTicketDurationUser,
  },
  Query: {
    GetTicketDurationUserByTicket,
  },
};
