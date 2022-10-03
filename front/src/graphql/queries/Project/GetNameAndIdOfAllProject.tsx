import { gql } from "@apollo/client";

const getNameAndIdProjects = gql`
  query Query {
    GetAllProjects {
      id
      title
    }
  }
`;

export default getNameAndIdProjects;
