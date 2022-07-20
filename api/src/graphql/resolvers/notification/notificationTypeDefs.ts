import { gql } from "apollo-server";

export default gql`
  type Notification {
    id: ID
    user_id: String
    is_read: Boolean
    data: data
  }

  type data {
    title: String
    content: String
    type: String
  }

  input dataInput {
    title: String
    content: String
    type: String
  }

  input UpdatedNotificationInput {
    is_read: Boolean
    data: dataInput
  }

  type Query {
    GetNotificationByUserId(userId: String!): [Notification]
  }

  type Mutation {
    UpdateNotification(
      notificationId: String!
      data: UpdatedNotificationInput
    ): Notification
  }

  scalar JSON
`;
