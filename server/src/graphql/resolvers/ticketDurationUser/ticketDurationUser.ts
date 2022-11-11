import CreateTicketDurationUser from "./mutations/CreateTicketDurationUser";
import GetTicketDurationUserByProject from "./queries/GetTicketDurationUserByProject";
import GetTicketDurationUserByTicket from "./queries/GetTicketDurationUserByTicket";
import StatHourPerDayByProject from "./queries/StatHourPerDayByProject";
import StatHourPerDayByProjectAndUser from "./queries/StatHourPerDayByProjectAndUser";

export default {
  Mutation: {
    CreateTicketDurationUser,
  },
  Query: {
    GetTicketDurationUserByTicket,
    GetTicketDurationUserByProject,
    StatHourPerDayByProject,
    StatHourPerDayByProjectAndUser,
  },
};
