import { gql } from "@apollo/client";

const getAllProjects = gql`
  query Query {
    GetAllState {
      id
      name
    }
  }
`;

export default getAllProjects;
