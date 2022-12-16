import { gql } from "@apollo/client";

export default gql`
mutation Mutation($projectId: String!) {
    DeleteProject(projectId: $projectId) {
      id
    }
  }
`;