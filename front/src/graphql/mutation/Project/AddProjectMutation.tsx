import { gql } from "@apollo/client";

const AddProjectMutation = gql`
mutation Mutation($data: ProjectInput) {
  AddProject(data: $data) {
    id
    title
    description
    start_at
    end_at
    product_owner_id
    participants {
      user {
        id
      }
    }
  }
}
`;
export default AddProjectMutation;