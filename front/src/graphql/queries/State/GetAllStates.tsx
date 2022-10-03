import { gql } from "@apollo/client";

const getAllStates = gql`
  query Query {
    GetAllState {
      id
      name
    }
  }
`;

export default getAllStates;
