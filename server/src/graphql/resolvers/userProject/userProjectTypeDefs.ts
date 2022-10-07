import { gql } from "apollo-server";

export default gql`
  type UserProject {
    id: ID
    user: User
    userId: String
    project: Project
    projectId: String
  }

  input AddUserProject {
    projectId: String
    userId: String
  }

  type Mutation {
    AddUserProject(data: AddUserProject!): UserProject
    DeleteUserProject(userProjectId: String!): UserProject
  }
`;

