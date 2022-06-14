import { gql } from "apollo-server";

export default gql`
  type Ticket {
    id: ID
    title: String
    project: Project
    project_id: String
    estimated_time: Int
    due_at: DateTime
    passed_time: Int
    advancement: Int
    state: State
    state_id: String
    ticketUser: [TicketUser]
  }

  type Query {
    GetAllTickets: [Ticket]
  }

  scalar DateTime
`;
