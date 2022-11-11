import { gql } from "apollo-server";

export default gql`
  type TicketDurationUser {
    id: ID
    user: User
    user_id: ID
    ticket: Ticket
    ticket_id: ID
    created_at: DateTime
    minute_passed: Int
  }

  type TicketDurationUserResponse {
    ticketDurationUser: [TicketDurationUser]
    totalTime: Int
  }

  type StatResponseHourPerDayByProject {
    datas: [Int]
    labels: [String]
    total_passed_time: Int
  }

  type DataStat {
    label: [String]
    data: [Int]
    user: User
  }

  type StatResponseHourPerDayByProjectAndUser {
    datas: [DataStat]
  }

  input TicketDurationUserInput {
    ticket_id: ID
    minute_passed: Int
  }

  type Mutation {
    CreateTicketDurationUser(data: TicketDurationUserInput): TicketDurationUser
  }

  type Query {
    GetTicketDurationUserByTicket(ticketId: ID): TicketDurationUserResponse
    GetTicketDurationUserByProject(projectId: ID): TicketDurationUserResponse
    StatHourPerDayByProject(projectId: ID): StatResponseHourPerDayByProject
    StatHourPerDayByProjectAndUser(
      userIdArray: [String]
      projectId: ID
    ): StatResponseHourPerDayByProjectAndUser
  }
`;
