import { gql } from "@apollo/client";

export default gql`
  mutation Mutation($loginUserInput: LoginUserInput) {
    Login(loginUserInput: $loginUserInput) {
      user {
        id
        mail
        roles
        firstname
        lastname
      }
      token
    }
  }
`;
