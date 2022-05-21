import { gql } from "apollo-server";

export default gql`
  type TicketUser {
    id: ID
    user: User
    userId: String
    ticket: Ticket
    ticketId: String
  }
`;
