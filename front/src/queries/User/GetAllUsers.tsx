import { gql } from "@apollo/client";

const getAllUsers = gql`
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

export default getAllUsers;
