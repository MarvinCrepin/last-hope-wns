import { gql } from "@apollo/client";

export default gql`
  query SessionUser {
    SessionUser {
      user {
        id
        mail
        roles
        firstname
        lastname
      }
      error
    }
  }
`;
