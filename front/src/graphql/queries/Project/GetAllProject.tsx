import { gql } from "@apollo/client";

const getAllProjects = gql`
  query Query {
    GetAllProjects {
      id
      time_spent
      advancement
      title
      description
      start_at
      end_at
      product_owner {
        id
        lastname
        firstname
      }
      participants {
        id
        user {
          id
          firstname
          lastname
          roles
        }
      }
      tickets {
        ticketDurationUser {
          user_id
          user_id
          minute_passed
        }
      }
    }
  }
`;

export default getAllProjects;
