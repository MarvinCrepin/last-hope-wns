import { gql } from "apollo-server";

export default gql`
  type UserProject {
    id: ID
    user: User
    userId: String
    project: Project
    projectId: String
  }
`;

