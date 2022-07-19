import DeleteUser from "./mutations/DeleteUser";
import UpdateUser from "./mutations/UpdateUser";
import AddUser from "./mutations/AddUser";

import GetAllUsers from "./queries/GetAllUsers";
import GetUserById from "./queries/GetUserById";
import Login from "./queries/Login";

export default {
  Query: {
    GetUserById,
    GetAllUsers,
    Login,
  },
  Mutation: {
    DeleteUser,
    UpdateUser,
    AddUser,
  },
};
