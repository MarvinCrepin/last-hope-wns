import { gql } from "@apollo/client";

const GetTotalTicketDurationUserByProject = gql`
  query GetTicketDurationUserByProject($projectId: ID) {
    GetTicketDurationUserByProject(projectId: $projectId) {
      ticketDurationUser {
        created_at
        id
        minute_passed
        user_id
        ticket {
          id
          title
        }
        user {
          id
          firstname
          lastname
        }
        ticket_id
      }
    }
  }
`;

export default GetTotalTicketDurationUserByProject;
