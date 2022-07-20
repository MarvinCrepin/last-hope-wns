import { gql } from "@apollo/client";

const GetNotificationByUserId = gql`
  query Query($userId: String!) {
    GetNotificationByUserId(userId: $userId) {
      id
    is_read
    title
    content
    type
    created_at
    }
  }
`;

export default GetNotificationByUserId;
