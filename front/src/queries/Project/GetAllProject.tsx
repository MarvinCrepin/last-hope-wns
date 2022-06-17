import { gql } from "@apollo/client";

const getAllProjects = gql`
  query Query {
    GetAllProjects {
      id
      title
      description
      start_at
      end_at
      due_at
      advancement
      product_owner {
        lastname
        firstname
      }
      participants {
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
