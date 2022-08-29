import { gql } from "@apollo/client";

export default gql`
mutation UpdateUser($userId: String!, $data: UpdateUserInput) {
  UpdateUser(userId: $userId, data: $data) {
    lastname
    firstname
    mail
    roles
  }
}
`;

