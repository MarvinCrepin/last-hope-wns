import { gql } from "apollo-server";

export default gql`
  type Comment {
    id: ID!
    user_id: String
    ticket_id: String
    content: String
    created_at: DateTime
    user: User
  }

  input CommentInput {
    user_id: String!
    ticket_id: String!
    content: String!
  }

  type Mutation {
    AddComment(data: CommentInput): Comment
  }

  type Query {
    GetCommentByTicketId(ticketId: String!): [Comment]
  }

  scalar DateTime
`;
