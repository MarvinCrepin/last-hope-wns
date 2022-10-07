import { gql } from "@apollo/client";

const GetAllTickets = gql`
  query GetAllTickets($isarchive: Boolean) {
    GetAllTickets(isarchive: $isarchive) {
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
      comments {
        content
        created_at
        user {
          lastname
          firstname
        }
        id
      }
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

export default GetAllTickets;
