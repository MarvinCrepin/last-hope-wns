import { gql } from "apollo-server";

export default gql`
  type TicketUser {
    id: ID
    user: User
    userId: String
    ticket: Ticket
    ticketId: String
  }

  input CreateTicketUser {
    ticketId: String
    userId: String
  }

  type Mutation {
    CreateTicketUser(data: CreateTicketUser!): TicketUser
    DeleteTicketUser(userTicketId: String!): TicketUser
  }
`;
