import { gql } from "@apollo/client";

export default gql`
  mutation Mutation($data: CommentInput) {
    AddComment(data: $data) {
      id
      user_id
      ticket_id
      content
      created_at
    }
  }
`;
