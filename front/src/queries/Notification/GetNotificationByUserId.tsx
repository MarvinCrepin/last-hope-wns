import { gql } from "@apollo/client";

const GetNotificationByUserId = gql`
  query Query($userId: String!) {
    GetNotificationByUserId(userId: $userId) {
      id
      is_read
      data
    }
  }
`;

export default GetNotificationByUserId;
