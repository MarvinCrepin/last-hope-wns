import { gql } from "@apollo/client";

export default gql`
  mutation Mutation($data: AddUserProject!) {
    AddUserProject(data: $data) {
      id
      userId
      user {
        firstname
        lastname
        id
      }
    }
  }
`;
