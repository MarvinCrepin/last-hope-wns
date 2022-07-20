import { gql } from "@apollo/client";

export default gql`
  query Login($mail: String!, $password: String!) {
    Login(mail: $mail, password: $password) {
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
