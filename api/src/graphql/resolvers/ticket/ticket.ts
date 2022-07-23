import UpdateTicket from "./mutations/UpdateTicket";
import GetAllTickets from "./queries/GetAllTickets";
import GetTicketById from "./queries/GetTicketById";

export default {
  Mutation: {
    UpdateTicket,
  },
  Query: {
    GetAllTickets,
    GetTicketById,
  },
};
