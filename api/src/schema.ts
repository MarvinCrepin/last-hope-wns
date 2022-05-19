import { gql } from "apollo-server";

export const typeDefs = gql`
  type Project {
    id: ID
    title: String
    description: String
    start_at: DateTime
    end_at: DateTime
    due_at: DateTime
    product_owner_id: Int
    advancement: Int
  }

  type Query {
    GetAllProjects: [Project]
    GetProjectById(projectId: String!): Project
  }

  input ProjectInput {
    id: ID
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
    UpdateProject(data:ProjectInput) : Project
  }

  scalar DateTime
`;
