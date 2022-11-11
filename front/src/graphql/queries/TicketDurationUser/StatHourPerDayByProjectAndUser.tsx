import { gql } from "@apollo/client";

const StatHourPerDayByProjectAndUser = gql`
  query StatHourPerDayByProjectAndUser($projectId: ID, $userIdArray: [String]) {
    StatHourPerDayByProjectAndUser(
      projectId: $projectId
      userIdArray: $userIdArray
    ) {
      datas {
        user {
          id
          firstname
          lastname
        }
        label
        data
      }
    }
  }
`;

export default StatHourPerDayByProjectAndUser;
