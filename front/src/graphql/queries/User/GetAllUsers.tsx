import { gql } from "@apollo/client";

export default gql`
  query Query {
    GetAllUsers {
      id
      lastname
      firstname
      mail
      roles
    }
  }
`;

