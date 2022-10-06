import { gql } from "@apollo/client";

export default gql`
  mutation DeleteUserProject($userProjectId: String!) {
    DeleteUserProject(userProjectId: $userProjectId) {
      id
    }
  }
`;
