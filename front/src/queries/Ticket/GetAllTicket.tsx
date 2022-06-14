import { gql } from "@apollo/client";

const getAllTickets = gql`
  query Query {
    GetAllTickets {
      id
      title
      project {
        title
      }
      description
      due_at
      advancement
      ticketUser {
        user {
          id
          lastname
          firstname
        }
      }
    }
  }
`;

export default getAllTickets;
