import { gql } from "@apollo/client";

export default gql`
  mutation DeleteTicketUser($userTicketId: String!) {
    DeleteTicketUser(userTicketId: $userTicketId) {
      id
    }
  }
`;
