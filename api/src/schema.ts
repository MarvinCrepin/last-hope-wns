import { gql } from "apollo-server";

export const typeDefs = gql`
  type Project {
    id: ID!
    title: String!
    description: String!
    start_at: DateTime!
    end_at: DateTime!
    due_at: DateTime!
    product_owner_id: String
    advancement: Int!
    product_owner: User
  }

  type User {
    id: ID
    lastname: String
    firstname: String
    mail: String
    roles: String
    password: String
  }

  type Query {
    GetAllProjects: [Project]
    GetProjectById(projectId: String!): Project
    GetUserById(userId: String!): User
  }

  input ProjectInput {
    title: String!
    description: String!
    start_at: DateTime!
    end_at: DateTime!
    due_at: DateTime!
    product_owner_id: Int
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
