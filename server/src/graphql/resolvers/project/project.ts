import GetAllProjects from "./queries/GetAllProjects";
import GetProjectById from "./queries/GetProjectById";
import AddProject from "./mutations/AddProject";
import DeleteProject from "./mutations/DeleteProject";
import UpdateProject from "./mutations/UpdateProject";

export default {
  Query: {
    GetAllProjects,
    GetProjectById,
  },

  Mutation: {
    AddProject,
    DeleteProject,
    UpdateProject
  },
};
