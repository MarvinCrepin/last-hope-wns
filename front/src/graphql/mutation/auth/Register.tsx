import { gql } from "@apollo/client";

export default gql`
  mutation Mutation($createUserInput: CreateUserInput) {
    AddUser(createUserInput: $createUserInput) {
      user {
        firstname
        id
        lastname
        mail
        roles
      }
    }
  }
`;
