import { gql } from "@apollo/client";

const StatHourPerDayByProject = gql`
  query StatHourPerDayByProject($projectId: ID) {
    StatHourPerDayByProject(projectId: $projectId) {
      datas
      labels
      total_passed_time
    }
  }
`;

export default StatHourPerDayByProject;
