import { gql } from "@apollo/client";

const UpdateTicket = gql`
  mutation Mutation($ticketId: String!, $data: TicketInputPatch) {
    UpdateTicket(ticketId: $ticketId, data: $data) {
      id
      title
      project {
        id
        title
      }
      description
      due_at
      estimated_time
      advancement
      ticketUser {
        id
        user {
          id
          lastname
          firstname
          roles
        }
      }
      state_id
      state {
        name
      }
    }
  }
`;

export default UpdateTicket;
