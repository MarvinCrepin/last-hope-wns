import { gql } from "@apollo/client";

const GetUserById = gql`
  query Query($userId: String!) {
    GetUserById(userId: $userId) {
      lastname
      firstname
    }
  }
`;
export default GetUserById;