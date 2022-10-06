import UpdateTicket from "./mutations/UpdateTicket";
import AddTicket from "./mutations/AddTicket";
import DeleteTicket from "./mutations/DeleteTicket";
import GetAllTickets from "./queries/GetAllTickets";
import GetTicketById from "./queries/GetTicketById";

export default {
  Mutation: {
    AddTicket,
    UpdateTicket,
    DeleteTicket,
  },
  Query: {
    GetAllTickets,
    GetTicketById,
  },
};
