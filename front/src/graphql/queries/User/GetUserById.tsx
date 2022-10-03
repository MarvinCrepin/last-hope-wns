import { gql } from "@apollo/client";

export default gql`
  query Query($userId: String!) {
    GetUserById(userId: $userId) {
      lastname
      firstname
      mail
      roles
    }
  }
`;
