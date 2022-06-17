import { gql } from "@apollo/client";

const UpdateTicket = gql`
  mutation Mutation($ticketId: String!, $data: TicketInputPatch) {
    UpdateTicket(ticketId: $ticketId, data: $data) {
      id
      title
      project {
        title
      }
      description
      due_at
      passed_time
      estimated_time
      advancement
      ticketUser {
        user {
          id
          lastname
          firstname
        }
      }
    }
  }
`;

export default UpdateTicket;
