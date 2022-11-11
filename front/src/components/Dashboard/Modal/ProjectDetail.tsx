import { useState, useEffect } from "react";
import Moment from "react-moment";
import { useMutation } from "@apollo/client";
import { useSelector } from "react-redux";

import { FaCheck, FaPencilAlt, FaRegUserCircle } from "react-icons/fa";
import { MdOutlineEdit, MdDone } from "react-icons/md";
import { FcCalendar } from "react-icons/fc";
import { AiFillSetting, AiOutlineClose } from "react-icons/ai";

import "../../../assets/css/projectDetail.css";
import { user } from "../../../slicer/authSlice";
import {
  isAuthorizedToManageProject,
  notify,
  returnRoleName,
  ROLES,
} from "../../common/Utils";
import { Participant, Project, User } from "../../global";

import UpdateProject from "../../../graphql/mutation/Project/UpdateProject";
import getAllProjects from "../../../graphql/queries/Project/GetAllProject";
import AddMemberToProject from "./AddForm/AddMemberToProject";
import CreateUserProject from "../../../graphql/mutation/UserProject/CreateUserProject";
import DeleteUserProject from "../../../graphql/mutation/UserProject/DeleteUserProject";
import EditProjectText from "./ProjectDetailComponent/EditProjectText";
import StatsPanel from "./ProjectDetailComponent/StatsPanel";

type Props = {
  project: Project;
  users: User[];
  closeModal: () => void;
};

function ProjectDetail({ project, users, closeModal }: Props) {
  // GENERAL
  const userInfo = useSelector(user);

  const [updateProject] = useMutation(UpdateProject, {
    refetchQueries: [{ query: getAllProjects }],
  });

  // PROJECT OWNER
  const [productOwnerId, setProductOwnerId] = useState(
    project.product_owner.id
  );

  const handleSelectChange = ({ target }: any) => {
    console.log(target.value);
    setProductOwnerId(target.value);
  };

  async function changeProjectOwner() {
    if (productOwnerId === project.product_owner.id) {
      setEnableEditProjectManager(false);
      return;
    }
    console.log(productOwnerId);
    try {
      await updateProject({
        variables: {
          projectId: project.id,
          data: {
            product_owner_id: productOwnerId,
          },
        },
      });
      notify("success", "Product Owner changed successfully");
      setEnableEditProjectManager(false);
    } catch (e) {
      notify("error", "Error while changing Product Owner");
      console.error(e);
    }
  }

  // MEMBERS
  const [modalAssignee, setModalAssignee] = useState(false);

  const openModal = (modal: string) => {
    switch (modal) {
      case "assignee":
        setModalAssignee(true);
        break;
      default:
        break;
    }

    if (modal === "assignee") {
      setModalAssignee(true);
    }
  };

  const [addUserProject, { loading: loadCreate }] = useMutation(
    CreateUserProject,
    { refetchQueries: [{ query: getAllProjects }] }
  );

  const addUserToProject = (user: { id: string }) => {
    addUserProject({
      variables: {
        data: {
          projectId: project.id,
          userId: user.id,
        },
      },
    });
    notify("success", "User successfuly added to the project!");
  };

  const [deleteUserProject] = useMutation(DeleteUserProject);

  const deleteAssigneeUser = async (userProjectId: string) => {
    try {
      await deleteUserProject({
        variables: {
          userProjectId: userProjectId,
        },
        update(cache) {
          const normalizedId = cache.identify({
            id: userProjectId,
            __typename: "UserProject",
          });
          cache.evict({ id: normalizedId });
          cache.gc();
        },
      });
      notify("success", "User successfuly deleted from the project!");
    } catch (err) {
      console.log(err);
      notify("error", "An error occured while deleting user from the project!");
    }
  };

  // DATE
  const [startAt, setStartAt] = useState(project.start_at);
  const [endAt, setEndAt] = useState(project.end_at);

  const [inputStart, setInputStart] = useState(false);
  const [inputEnd, setInputEnd] = useState(false);

  const [dataToSend, setDataToSend] = useState({});
  useEffect(() => {
    setDataToSend({
      start_at: startAt,
      end_at: endAt,
    });
  }, [startAt, endAt]);

  const handleChangeStart = async () => {
    setInputStart(false);
    try {
      await updateDate();
      notify("success", "Start date successfuly changed!");
    } catch (error) {
      notify("error", "An error occured while changing start date!");
      console.error(error);
    }
  };

  const handleChangeEnd = async () => {
    setInputEnd(false);
    try {
      await updateDate();
      notify("success", "End date successfuly changed!");
    } catch (error) {
      console.error(error);
      notify("error", "An error occured while changing end date!");
    }
  };

  const [updateDate] = useMutation(UpdateProject, {
    variables: {
      projectId: project.id,
      data: {
        ...dataToSend,
      },
    },
  });

  // INFORMATION PROJECT
  const [enableEditProjectManager, setEnableEditProjectManager] =
    useState(false);
  const [modalEditProject, setModalEditProject] = useState(false);

  const uddateInformationProject = async (data: {}) => {
    try {
      await updateProject({
        variables: {
          projectId: project.id,
          data: {
            ...data,
          },
        },
      });
      notify("success", "Project information successfuly updated!");
      setModalEditProject(false);
    } catch (e) {
      console.error(e);
      notify("error", "An error occured while updating project information!");
    }
  };

  // const current = new Date();
  // const currentDate = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

  return (
    <>
      {modalEditProject && (
        <EditProjectText
          project={project}
          closeModal={() => setModalEditProject(false)}
          updatedProject={(data) => uddateInformationProject(data)}
        />
      )}

      {modalAssignee && (
        <AddMemberToProject
          closeModal={() => setModalAssignee(false)}
          onCreate={false}
          addUser={(user) => addUserToProject(user)}
          deleteUser={(userProject) => deleteAssigneeUser(userProject.id)}
          usersAssignee={project.participants}
        />
      )}
      <div
        className="fixed z-10 inset-0 overflow-y-auto"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-end justify-center  pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity "
            onClick={() => closeModal()}
          ></div>
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <div className="px-32 inline-block align-bottom text-left transform transition-all  sm:align-middle  w-full h-full project-modal">
            <div className=" bg-lh-primary text-xl h-12 font-text text-lh-light w-fit px-3 flex justify-center items-center rounded-t-lg">
              <div>{`Project detail - ${project.title}`}</div>
            </div>
            <div className="relative bg-white rounded-b-lg rounded-tr-lg flex flex-col lg:grid lg:grid-cols-2 py-8 ">
              <div
                className="absolute right-2 top-2 text-lh-primary cursor-pointer"
                onClick={() => closeModal()}
              >
                <AiOutlineClose size={30} />
              </div>
              {/* Left column */}
              <div className="flex flex-col items-center justify-start">
                <div className="space-y-8 py-4 w-4/5">
                  {/* Description */}
                  <div className="space-y-4">
                    <div className="flex items-center ">
                      <h3 className="text-lh-primary font-title text-4xl">
                        Description
                      </h3>
                      {isAuthorizedToManageProject(
                        userInfo,
                        project.product_owner.id
                      ) && (
                        <FaPencilAlt
                          size={30}
                          onClick={() => setModalEditProject(true)}
                          className="text-lh-primary cursor-pointer hover:opacity-90 transition-opacity ml-4"
                        />
                      )}
                    </div>
                    <div className="max-h-[8rem] min-h-[4rem] overflow-y-scroll scrollbar-style">
                      {project.description ? (
                        <p className="font_weight_400 font-text text-xl	">
                          {project.description}
                        </p>
                      ) : (
                        <p className="font_weight_400 font-text text-xl	italic">
                          No description for this project
                        </p>
                      )}
                    </div>
                  </div>

                  {/* PROJECT OWNER */}
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <h3 className="text-lh-primary font-title text-4xl">
                        Project Manager
                      </h3>
                      {isAuthorizedToManageProject(
                        userInfo,
                        project.product_owner.id
                      ) && (
                        <AiFillSetting
                          onClick={() => setEnableEditProjectManager(true)}
                          size={30}
                          className="text-lh-primary cursor-pointer hover:opacity-90 transition-opacity ml-4"
                        />
                      )}
                    </div>
                    {!enableEditProjectManager ? (
                      <div className="font_weight_400 font-text text-xl	flex items-center space-x-1 h-10">
                        <FaRegUserCircle size={30} />
                        <span>
                          {" "}
                          {project.product_owner.firstname +
                            " " +
                            project.product_owner.lastname}
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-4 h-10">
                        <select
                          defaultValue={project.product_owner.id}
                          onChange={handleSelectChange}
                          name="projectProductOwner"
                          className="w-52 rounded bg-lh-light text-lh-dark p-2  border-[1.5px] border-lh-dark focus-visible:border-lh-primary "
                        >
                          {users
                            .filter((user: any) => {
                              return (
                                user.roles === ROLES.PRODUCT_MANAGER ||
                                user.roles === ROLES.ADMIN
                              );
                            })
                            .map((user: User) => (
                              <option value={user.id} key={user.id}>
                                {user.firstname} {user.lastname}
                              </option>
                            ))}
                        </select>
                        <button
                          onClick={(e) => changeProjectOwner()}
                          className="w-fit bg-lh-primary cursor-pointer text-lh-light py-1.5 px-3  items-center rounded"
                        >
                          <div className="flex items-center">
                            Change{" "}
                            <span className="pl-3">
                              <FaCheck size={14} />
                            </span>
                          </div>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* MEMBERS */}
                  <div className="section-members ">
                    <div className="flex items-center">
                      <h2 className="text-4xl font-title text-lh-primary mr-4">
                        Members
                      </h2>
                      <AiFillSetting
                        size={30}
                        onClick={() => openModal("assignee")}
                        className="text-lh-primary cursor-pointer hover:opacity-90 transition-opacity text-2xl"
                      />
                    </div>
                    <div className="mt-4">
                      {project.hasOwnProperty("participants") &&
                      project.participants.length > 0 ? (
                        <div className="flex flex-wrap space-x-4">
                          {project.participants.map((user: Participant) => {
                            return (
                              <div
                                className="font_weight_400 font-text text-xl	flex items-center space-x-1 h-10"
                                key={user.id}
                              >
                                <FaRegUserCircle size={30} />
                                <span>
                                  {`${user.user.firstname} ${user.user.lastname} -`}
                                </span>
                                <span className="text-lh-secondary">{`${
                                  user.user.roles &&
                                  returnRoleName(user.user.roles)
                                }`}</span>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="font_weight_400 font-text text-xl	flex items-center space-x-2 italic">
                          No members defined
                        </div>
                      )}
                    </div>
                  </div>

                  {/* DATE */}
                  <div>
                    <h2 className="text-4xl font-title text-lh-primary ">
                      Infos
                    </h2>
                    <div className="pt-4 pb-6">
                      <div className="text-gray-700 font-title text-xl h-8 flex items-center space-x-3">
                        <FcCalendar size={30} />
                        <p>Start date:</p>
                        {inputStart ? (
                          <>
                            <input
                              className="rounded bg-lh-light text-lh-dark border-[1.5px] border-lh-dark focus-visible:ring-lh-primary"
                              type="date"
                              name="start_at"
                              value={startAt.toString()}
                              onChange={(e: any) => {
                                if (
                                  !endAt ||
                                  new Date(e.target.value) <= new Date(endAt)
                                ) {
                                  setStartAt(e.target.value);
                                } else {
                                  notify(
                                    "error",
                                    "Please put a start date less than or equal to the end date."
                                  );
                                }
                              }}
                            />
                            <MdDone
                              onClick={() => {
                                handleChangeStart();
                              }}
                              size={25}
                              className="cursor-pointer ml-2"
                            />
                          </>
                        ) : (
                          <>
                            <span className="">
                              {startAt ? (
                                <Moment format="MM/DD/YYYY">{startAt}</Moment>
                              ) : (
                                "Not Defined"
                              )}
                            </span>
                            <MdOutlineEdit
                              onClick={() => setInputStart(true)}
                              size={25}
                              className="cursor-pointer "
                            />
                          </>
                        )}
                      </div>
                      <div className="text-gray-700 font-title text-xl h-8 flex items-center space-x-3">
                        <FcCalendar size={30} />
                        <p>End date:</p>
                        {inputEnd ? (
                          <>
                            <input
                              className="rounded bg-lh-light text-lh-dark border-[1.5px] border-lh-dark focus-visible:ring-lh-primary"
                              type="date"
                              name="end_at"
                              value={endAt.toString()}
                              onChange={(e: any) => {
                                if (
                                  !startAt ||
                                  new Date(e.target.value) >= new Date(startAt)
                                ) {
                                  setEndAt(e.target.value);
                                } else {
                                  notify(
                                    "error",
                                    "Please put an end date higher than or equal to the start date."
                                  );
                                }
                              }}
                            />
                            <MdDone
                              onClick={() => {
                                handleChangeEnd();
                              }}
                              size={25}
                              className="cursor-pointer "
                            />
                          </>
                        ) : (
                          <>
                            <span className="">
                              {endAt ? (
                                <Moment format="MM/DD/YYYY">{endAt}</Moment>
                              ) : (
                                "Not Defined"
                              )}
                            </span>

                            <MdOutlineEdit
                              onClick={() => setInputEnd(true)}
                              size={25}
                              className="cursor-pointer ml-2"
                            />
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Right column */}
              <div className="border-l-2 flex flex-col items-center justify-start">
                <div className="space-y-8 py-4 w-4/5">
                  {/*  */}
                  <StatsPanel project={project} />

                  {/* <div className="space-y-4">
                    <div className="flex items-center ">
                      <h3 className="text-lh-primary font-title text-4xl">
                        Member Statistics
                      </h3>
                    </div>
                    <StatsPanel projectId={project.id} />
                  </div> */}
                  {/* <div className="space-y-4">
                    <div className="flex items-center ">
                      <h3 className="text-lh-primary font-title text-4xl">
                        Member Statistics
                      </h3>
                    </div>
                    <StatsPanel projectId={project.id} />
                  </div> */}
                </div>
              </div>

              {/* <div className="project-modal-stats py-8 px-2 sm:pl-6 sm:pr-4 border-l-2">
                <div className="project-modal-pstats pb-10">
                  <h2 className="text-4xl font-title text-lh-primary ">
                    Project Statistics
                  </h2>
                  <div>
                    <Line data={projectStats} options={options} />
                  </div>
                </div>
                <div className="project-modal-mstats">
                  <h2 className="text-4xl font-title text-lh-primary ">
                    Member Statistics
                  </h2>
                  <div>
                    <Line data={memberStats} options={options} />
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectDetail;
