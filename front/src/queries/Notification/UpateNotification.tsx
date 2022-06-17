import { gql } from "@apollo/client";

const UPDATE_NOTIFICATION = gql`
  mutation Mutation($notificationId: String!, $data: UpdatedNotificationInput) {
    UpdateNotification(notificationId: $notificationId, data: $data) {
      is_read
      user_id
      data
      id
    }
  }
`;

export default UPDATE_NOTIFICATION;
