import { gql } from "@apollo/client";

const UPDATE_NOTIFICATION = gql`
  mutation Mutation($notificationId: String!, $data: UpdatedNotificationInput) {
    UpdateNotification(notificationId: $notificationId, data: $data) {
      id
      user_id
      is_read
      title
      content
      type
    }
  }
`;

export default UPDATE_NOTIFICATION;
