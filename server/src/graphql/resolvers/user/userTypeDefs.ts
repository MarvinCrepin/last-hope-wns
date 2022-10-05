import { gql } from "apollo-server";

export default gql`
  type User {
    id: ID
    lastname: String
    firstname: String
    mail: String
    roles: String
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
    id: ID
    mail: String
    firstname: String
    lastname: String
    roles: String
    iat: Int
    exp: Int
  }

  input LoginUserInput {
    mail: String!
    password: String!
  }

  type Query {
    GetUserById(userId: String!): User
    GetAllUsers: [User]
    SessionUser: ResponseSessionUser
  }

  type Mutation {
    Login(loginUserInput: LoginUserInput): ResponseSecurity
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
