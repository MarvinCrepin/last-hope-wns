import { gql } from "@apollo/client";

export default gql`
mutation DeleteUser($userId: String!) {
  DeleteUser(userId: $userId) {
    id
  }
}
`;

