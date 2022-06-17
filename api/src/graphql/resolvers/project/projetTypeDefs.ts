import { gql } from "apollo-server";

export default gql`
  type Project {
    id: ID!
    title: String!
    description: String!
    start_at: DateTime!
    end_at: DateTime!
    due_at: DateTime!
    product_owner_id: String
    advancement: Int!
    estimated_time: Int
    passed_time: Int
    product_owner: User
  }

  type Query {
    GetAllProjects: [Project]
    GetProjectById(projectId: String!): Project
  }

  input ProjectInput {
    title: String!
    description: String!
    start_at: DateTime!
    end_at: DateTime!
    due_at: DateTime!
    product_owner_id: String
    advancement: Int!
  }

  input UpdatedProjectInput {
    title: String
    description: String
    start_at: DateTime
    end_at: DateTime
    due_at: DateTime
    product_owner_id: Int
    advancement: Int
  }

  type Mutation {
    AddProject(data: ProjectInput): Project
    DeleteProject(projectId: String!): Project
    UpdateProject(projectId: String!, data: UpdatedProjectInput): Project
  }

  scalar DateTime
`;
