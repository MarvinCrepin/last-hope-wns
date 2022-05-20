import { gql } from "apollo-server";

export default gql`
  type Notification {
    id: ID
    user_id: String
    is_read: Boolean
    data: JSON
  }

  type Query {
    GetNotificationByUserId(userId: String!): [Notification]
  }

  scalar JSON
`;
