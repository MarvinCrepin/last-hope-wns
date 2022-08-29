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

  input SortingInput {
    created_at: Sort
  }

  type Mutation {
    AddComment(data: CommentInput): Comment
    DeleteComment(commentId: String!): Comment
  }

  type Query {
    GetCommentByTicketId(ticketId: String!, orderBy: SortingInput): [Comment]
  }

  scalar DateTime

  enum Sort {
    asc
    desc
  }
`;
