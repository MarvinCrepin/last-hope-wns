import UpdateTicket from "./mutations/UpdateTicket";
import AddTicket from "./mutations/AddTicket";
import GetAllTickets from "./queries/GetAllTickets";
import GetTicketById from "./queries/GetTicketById";

export default {
  Mutation: {
    AddTicket,
    UpdateTicket,
  },
  Query: {
    GetAllTickets,
    GetTicketById,
  },
};
