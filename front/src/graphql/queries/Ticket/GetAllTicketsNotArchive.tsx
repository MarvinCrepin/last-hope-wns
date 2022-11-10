import { gql } from "@apollo/client";

const getAllTicketsNotArchive = gql`
  query GetAllTickets($isarchive: Boolean) {
    GetAllTickets(isarchive: $isarchive) {
      id
      title
      project {
        id
        title
        product_owner_id
      }
      description
      due_at
      estimated_time
      advancement
      ticketUser {
        id
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

export default getAllTicketsNotArchive;
