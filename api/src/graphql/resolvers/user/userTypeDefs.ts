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

  type Query {
    GetUserById(userId: String!): User
  }
`;
