import { gql } from "@apollo/client";

const getAllProjects = gql`
query ExampleQuery {
  GetAllProjects {
    id
    title
    advancement
  }
}
`;

export default getAllProjects;