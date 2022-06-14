import DeleteUser from "./mutations/DeleteUser";
import UpdateUser from "./mutations/UpdateUser";
import GetAllUsers from "./queries/GetAllUsers";
import GetUserById from "./queries/GetUserById";
export default {
  Query: {
    GetUserById,
    GetAllUsers
  },
  Mutation: {
    DeleteUser,
    UpdateUser
  }
};
