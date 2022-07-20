import { gql } from "@apollo/client";

export default gql`
  query SessionUser {
    SessionUser {
      user {
        mail
        roles
      }
      error
    }
  }
`;
