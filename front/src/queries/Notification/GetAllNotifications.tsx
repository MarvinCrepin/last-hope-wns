import { gql } from "@apollo/client";

const getAllNotifications = gql`
  query Query($userId: String!) {
    GetNotificationByUserId(userId: $userId) {
      id
      is_read
      data
      created_at
    }
  }
`;

export default getAllNotifications;
