import DeleteUser from "./mutations/DeleteUser";
import UpdateUser from "./mutations/UpdateUser";
import AddUser from "./mutations/AddUser";

import GetAllUsers from "./queries/GetAllUsers";
import GetUserById from "./queries/GetUserById";
import Login from "./mutations/Login";
import SessionUser from "./queries/SessionUser";

export default {
  Query: {
    GetUserById,
    GetAllUsers,
    SessionUser,
  },
  Mutation: {
    Login,
    DeleteUser,
    UpdateUser,
    AddUser,
  },
};
