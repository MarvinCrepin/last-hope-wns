import { gql } from "apollo-server";

export default gql`
  type State {
    id: ID
    name: String
    tickets: [Ticket]
  }
`;
