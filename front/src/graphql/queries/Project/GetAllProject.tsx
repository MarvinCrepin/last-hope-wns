import { gql } from "@apollo/client";

const getAllProjects = gql`
  query Query {
    GetAllProjects {
      id
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
    }
  }
`;

export default getAllProjects;
