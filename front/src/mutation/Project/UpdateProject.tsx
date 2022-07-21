import { gql } from "@apollo/client";

const UpdateProject = gql`
mutation Mutation($projectId: String!) {
  UpdateProject(projectId: $projectId) {
    id
    title
    description
    start_at
    end_at
    due_at
    product_owner_id
    advancement
    estimated_time
    passed_time
    participants {
      user {
        id
      }
    }
  }
}
`;
export default UpdateProject;
