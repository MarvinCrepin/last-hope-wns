import { gql } from "@apollo/client";

const getAllProjects = gql`
  query GetAllProjects {
    Project {
      title
      advancement
      title
      due_date
    }
  }
`;

export default getAllProjects