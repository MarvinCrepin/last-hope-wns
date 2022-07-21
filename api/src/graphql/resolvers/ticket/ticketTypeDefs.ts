import { gql } from "apollo-server";

export default gql`
  type Ticket {
    id: ID
    title: String
    project: Project
    project_id: String
    estimated_time: Int
    due_at: DateTime
    passed_time: Float
    advancement: Int
    state: State
    state_id: String
    ticketUser: [TicketUser]
    description: String
  }

  input TicketInputPatch {
    title: String
    estimated_time: Int
    due_at: DateTime
    passed_time: Float
    advancement: Int
    state_id: String
    description: String

  }

  type Query {
    GetAllTickets: [Ticket]
  }

  type Mutation {
    UpdateTicket(ticketId: String!, data: TicketInputPatch): Ticket
  }

  scalar DateTime
`;
