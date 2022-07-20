import { gql } from "apollo-server";

export default gql`
  type User {
    id: ID
    lastname: String
    firstname: String
    mail: String
    roles: String
    password: String
  }

  type ResponseSecurity {
    user: User
    token: String
  }

  type ResponseSessionUser {
    user: payloadToken
    error: String
  }

  type payloadToken {
    mail: String
    roles: String
    iat: Int
    exp: Int
  }

  type Query {
    GetUserById(userId: String!): User
    GetAllUsers: [User]
    Login(mail: String!, password: String!): ResponseSecurity
    SessionUser: ResponseSessionUser
  }

  type Mutation {
    DeleteUser(userId: String!): User
    UpdateUser(userId: String!, data: UpdateUserInput): User
    AddUser(createUserInput: CreateUserInput): ResponseSecurity
  }

  input UpdateUserInput {
    lastname: String
    firstname: String
    mail: String
    roles: String
    password: String
  }

  input CreateUserInput {
    lastname: String
    firstname: String
    mail: String
    password: String
  }
`;
