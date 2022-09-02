import { gql } from "@apollo/client";

export default gql`
  query Query($ticketId: String!) {
    GetTicketById(ticketId: $ticketId) {
      id
      title
      project {
        id
        title
      }
      description
      due_at
      estimated_time
      advancement
      ticketUser {
        user {
          id
          lastname
          firstname
          roles
        }
      }
      state_id
      state {
        name
      }
    }
  }
`;
