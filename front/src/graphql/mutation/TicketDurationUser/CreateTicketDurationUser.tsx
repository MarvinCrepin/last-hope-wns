import { gql } from "@apollo/client";

const CreateTicketDurationUser = gql`
  mutation CreateTicketDurationUser($data: TicketDurationUserInput) {
    CreateTicketDurationUser(data: $data) {
      id
      user_id
      ticket_id
      created_at
      minute_passed
    }
  }
`;

export default CreateTicketDurationUser;
