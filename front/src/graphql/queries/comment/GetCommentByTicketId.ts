import { gql } from "@apollo/client";

export default gql`
  query Query($ticketId: String!) {
    GetCommentByTicketId(ticketId: $ticketId, orderBy: { created_at: desc }) {
      id
      user_id
      ticket_id
      content
      created_at
      user {
        id
        lastname
        firstname
        mail
        roles
      }
    }
  }
`;
