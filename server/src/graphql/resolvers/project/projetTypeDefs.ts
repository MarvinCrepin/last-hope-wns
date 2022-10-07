import { gql } from "apollo-server";

export default gql`
  type Project {
    id: ID!
    title: String!
    description: String
    start_at: DateTime
    end_at: DateTime
    product_owner_id: String
    product_owner: User
    participants: [UserProject]
    tickets: [Ticket]
    time_spent: Int
    advancement: Int
  }

  type Query {
    GetAllProjects: [Project]
    GetProjectById(projectId: String!): Project
  }

  input ProjectInput {
    title: String!
    description: String
    start_at: DateTime
    end_at: DateTime
    product_owner_id: String!
    estimated_time: Int
    participants: [UserProjectNested]
  }

  input UserProjectNested {
    userId: String
  }

  input UpdatedProjectInput {
    title: String
    description: String
    start_at: DateTime
    end_at: DateTime
    due_at: DateTime
    product_owner_id: String!
    advancement: Int
  }

  type Mutation {
    AddProject(data: ProjectInput): Project
    DeleteProject(projectId: String!): Project
    UpdateProject(projectId: String!, data: UpdatedProjectInput): Project
  }

  scalar DateTime
`;
