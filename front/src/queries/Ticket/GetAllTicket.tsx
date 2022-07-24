import { gql } from "@apollo/client";

const getAllTickets = gql`
  query Query {
    GetAllTickets {
      id
      title
      project {
        id
        title
      }
      description
      due_at
      passed_time
      estimated_time
      advancement
      ticketUser {
        user {
          id
          lastname
          firstname
        }
      }
      state_id
      state {
        name
      }
    }
  }
`;

export default getAllTickets;
