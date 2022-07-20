import { useMutation } from "@apollo/client";

import UPDATE_NOTIFICATION from "../../queries/Notification/UpateNotification";

interface IMyProps {
  notification: Notification;
}

type Notification = {
  id: string;
  is_read: Boolean;
  data: {
    type: string;
    titre: string;
    content: string;
  };
};

export default function NotificationItem({ notification }: IMyProps) {
  const [UpdateNotification] = useMutation(UPDATE_NOTIFICATION);

  return (
    <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
      <div className="max-w-sm w-full bg-white pointer-events-auto overflow-hidden">
        <div className="p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg
                className="h-6 w-6 text-lh-primary"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
            </div>
            <div className="ml-3 w-0 flex-1 pt-0.5">
              <p className="text-sm font-medium text-lh-primary">
                Discussion moved
              </p>
              {/* <p className="mt-1 text-sm text-lh-dark">
               {notification.data}
              </p> */}
              <div className="mt-3 flex justify-between">
                <button
                  onClick={() => {
                    UpdateNotification({
                      variables: {
                        notificationId: notification.id,
                        data: { is_read: true },
                      },
                    });
                  }}
                  type="button"
                  className="bg-white rounded-md text-sm font-medium text-lh-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Mark as read
                </button>
                <span className="text-sm text-lh-gray">
                  15 juin 2022 - 14:56
                </span>
              </div>
            </div>
            <div className="ml-4 flex-shrink-0 flex">
              <button
                type="button"
                className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="sr-only">Close</span>

                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
