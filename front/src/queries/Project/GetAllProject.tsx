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
      estimated_time
      advancement
      product_owner {
        lastname
        firstname
      }
    }
  }
`;

export default getAllProjects;
