import { gql } from "@apollo/client";

const GetTotalTicketDurationUserByTicket = gql`
  query GetTicketDurationUserByTicket($ticketId: ID) {
    GetTicketDurationUserByTicket(ticketId: $ticketId) {
      totalTime
    }
  }
`;

export default GetTotalTicketDurationUserByTicket;
