import { gql } from "@apollo/client";

type NotificationInput = {
  is_read?: Boolean;
  data?: JSON;
};

const UPDATE_NOTIFICATION = gql`
  mutation UpdateNotification($notificationId: String!, $data: any) {
    UpdateNotification(notificationId: $notificationId, data: $data) {
      is_read
      data
    }
  }
`;

export default UPDATE_NOTIFICATION;
