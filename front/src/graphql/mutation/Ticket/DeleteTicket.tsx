import { gql } from "@apollo/client";

export default gql`
  mutation Mutation($ticketId: String!) {
    DeleteTicket(ticketId: $ticketId) {
      id
    }
  }
`;
