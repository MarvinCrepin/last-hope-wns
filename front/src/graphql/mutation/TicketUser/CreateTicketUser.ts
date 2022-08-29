import { gql } from "@apollo/client";

export default gql`
  mutation Mutation($data: CreateTicketUser!) {
    CreateTicketUser(data: $data) {
      id
      ticket {
        id
        ticketUser {
          id
          userId
          ticketId
        }
      }
    }
  }
`;
