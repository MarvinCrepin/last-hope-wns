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

  input TicketDurationUserInput {
    ticket_id: ID
    minute_passed: Int
  }

  type Mutation {
    CreateTicketDurationUser(data: TicketDurationUserInput): TicketDurationUser
  }
`;
