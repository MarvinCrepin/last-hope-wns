import { gql } from "apollo-server";

export default gql`
  type Ticket {
    id: ID
    title: String
    project: Project
    project_id: String
    estimated_time: Int
    due_at: DateTime
    advancement: Int
    state: State
    state_id: String
    ticketUser: [TicketUser]
    description: String
    ticketDurationUser: [TicketDurationUser]
  }

  input TicketInputPatch {
    title: String
    estimated_time: Int
    due_at: DateTime
    advancement: Int
    state_id: String
    description: String
    isArchived: Boolean
  }

  input AddTicketInput {
    title: String
    estimated_time: Int
    project_id: ID
    due_at: DateTime
    description: String
    state_id: String
    ticketUser: [TicketUserNestedInput]
  }

  input TicketUserNestedInput {
    userId: String
  }

  type Query {
    GetAllTickets(isarchive: Boolean): [Ticket]
    GetTicketById(ticketId: String!): Ticket
  }

  type Mutation {
    UpdateTicket(ticketId: String!, data: TicketInputPatch): Ticket
    AddTicket(data: AddTicketInput): Ticket
    DeleteTicket(ticketId: String!): Ticket
  }

  scalar DateTime
`;
