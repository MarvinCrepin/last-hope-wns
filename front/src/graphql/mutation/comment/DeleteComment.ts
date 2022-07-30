import { gql } from "@apollo/client";

export default gql`
  mutation Mutation($commentId: String!) {
    DeleteComment(commentId: $commentId) {
      id
    }
  }
`;
