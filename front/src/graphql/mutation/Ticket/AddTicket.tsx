import { gql } from "@apollo/client";

const AddTicket = gql`
  mutation Mutation($data: AddTicketInput) {
    AddTicket(data: $data) {
      id
      ticketUser {
        id
      }
      title
    }
  }
`;
export default AddTicket;
