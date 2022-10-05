import { useState } from "react";
import Moment from "react-moment";

import { useMutation } from "@apollo/client";
import { FaCalendarCheck, FaCalendarDay, FaCheck } from "react-icons/fa";
import { MdOutlineAccountCircle } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

import { Chart, registerables } from "chart.js";
import { Line } from "react-chartjs-2";

import { useSelector } from "react-redux";
import "../../../assets/css/projectDetail.css";
import { role } from "../../../slicer/authSlice";
import { roleList } from "../../common/Utils";
import { Participant, Project, User } from "../../global";

import UpdateProject from "../../../graphql/mutation/Project/UpdateProject";
import getAllProjects from "../../../graphql/queries/Project/GetAllProject";
import { AiOutlineClose } from "react-icons/ai";

Chart.register(...registerables);

const projectStats = {
  labels: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
  datasets: [
    {
      label: "Project Statistics (tasks/day)",
      data: [4, 1, 3, 3, 6, 2],
      fill: false,
      borderColor: "rgb(214 96 96)",
      backgroundColor: "rgb(214 96 96)",
      pointRadius: 5,
      pointHoverRadius: 10,
      pointHitRadius: 30,
      pointBorderWidth: 2,
    },
  ],
};

const memberStats = {
  labels: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
  datasets: [
    {
      label: "Project Statistics (hours/day)",
      data: [3, 5, 5, 4, 7, 1, 0],
      fill: false,
      borderColor: "rgb(214 96 96)",
      backgroundColor: "rgb(214 96 96)",
      pointRadius: 5,
      pointHoverRadius: 10,
      pointHitRadius: 30,
      pointBorderWidth: 2,
    },
  ],
};

const options: any = {
  maintaintAspectRatio: false,
};

type Props = {
  project: Project;
  users: User[];
  closeModal: () => void;
};

function ProjectDetail({ project, users, closeModal }: Props) {
  const userRole = useSelector(role);
  const [productOwnerId, setProductOwnerId] = useState(
    project.product_owner.id
  );
  const [updateProject] = useMutation(UpdateProject, {
    refetchQueries: [{ query: getAllProjects }],
  });

  const handleSelectChange = ({ target }: any) => {
    setProductOwnerId(target.value);
  };

  function changeProjectOwner() {
    updateProject({
      variables: {
        projectId: project.id,
        data: {
          product_owner_id: productOwnerId,
        },
      },
    });
  }

  return (
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

        <div className="inline-block align-bottom text-left transform transition-all sm:align-middle project-modal">
          <div className=" bg-lh-primary text-xl h-12 font-text text-lh-light w-fit px-3 flex justify-center items-center rounded-t-lg">
            <div>{`Project detail`}</div>
          </div>
          <div className=" relative bg-white rounded-lg text-left overflow-hidden transform transition-all project-modal-inside">
            <div
              className="absolute right-2 top-2 text-lh-primary cursor-pointer"
              onClick={() => closeModal()}
            >
              <AiOutlineClose size={30} />
            </div>
            <div className="project-modal-infos py-8 px-2 sm:pl-6 sm:pr-6">
              <div>
                <h2 className="text-4xl font-title text-lh-primary ">
                  {"{ " + project.title + " }"}
                </h2>
                {project.description === "null" ? (
                  <p className="pt-4 pb-6">No description defined</p>
                ) : (
                  <p className="text-gray-700 pt-4 pb-6 text-xl">
                    {project.description}
                  </p>
                )}
              </div>
              <div className="section-po">
                <h2 className="text-4xl font-title text-lh-primary ">
                  Project Manager
                </h2>
                {(userRole === roleList[1] || userRole === roleList[2]) && (
                  <div className="pt-4 pb-6 flex items-center">
                    <select
                      defaultValue={project.product_owner.id}
                      onChange={handleSelectChange}
                      name="projectProductOwner"
                      className="bg-lh-light border-2 border-lh-dark py-1 px-1.5 mr-5 select-product-owner cursor-pointer"
                    >
                      {users
                        .filter(
                          (user: any) =>
                            user.roles === roleList[1] ||
                            user.roles === roleList[2]
                        )
                        .map((user: User) => (
                          <option value={user.id} key={user.id}>
                            {user.firstname} {user.lastname}
                          </option>
                        ))}
                    </select>
                    <button
                      onClick={(e) => changeProjectOwner()}
                      className="bg-lh-secondary font-text text-lh-light px-3 flex space-x-2 items-center change-po"
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
                {userRole === roleList[0] && (
                  <div className="pt-4 pb-6 flex items-center">
                    {project.product_owner ? (
                      <>
                        <MdOutlineAccountCircle size={30} />
                        <p className="text-gray-700 font-title pl-3 text-xl">
                          {project.product_owner.firstname +
                            " " +
                            project.product_owner.lastname}
                        </p>
                      </>
                    ) : (
                      "No project manager defined"
                    )}
                  </div>
                )}
              </div>
              <div className="section-members">
                <h2 className="text-4xl font-title text-lh-primary ">
                  Members
                </h2>
                <ul className="list-disc list-inside pt-4 pb-6 flex flex-wrap">
                  {project.participants.length === 0 ? (
                    <p>No members defined</p>
                  ) : (
                    project.participants.map((participant: Participant) => (
                      <li
                        key={participant.user.id}
                        className="flex items-center py-2 pr-4"
                      >
                        <MdOutlineAccountCircle size={30} />
                        <p className="text-gray-700 font-title pl-3 text-xl flex">
                          {participant.user.firstname}{" "}
                          {participant.user.lastname} -&nbsp;
                          <span className="text-lh-light-gray flex items-center">
                            {(() => {
                              switch (participant.user.roles) {
                                case "ROLE_DEVELOPER":
                                  return "Developer";
                                case "ROLE_PROJECT_MANAGER":
                                  return "Project Manager";
                                case "ROLE_ADMIN":
                                  return "Admin";
                                default:
                                  return "No role defined";
                              }
                            })()}
                            <span className="text-lh-primary pl-2 cursor-pointer">
                              {(userRole === roleList[1] ||
                                userRole === roleList[2]) && (
                                <RiDeleteBin6Line />
                              )}
                            </span>
                          </span>
                        </p>
                      </li>
                    ))
                  )}
                </ul>
              </div>
              <div>
                <h2 className="text-4xl font-title text-lh-primary ">Infos</h2>
                <div className="pt-4 pb-6">
                  <p className="text-gray-700 font-title text-xl flex">
                    <FaCalendarDay />
                    <span className="pl-3">
                      Start date:{" "}
                      <Moment format="MM/DD/YYYY">
                        {project.start_at
                          ? project.start_at.toString()
                          : "Not Defined"}
                      </Moment>
                    </span>
                  </p>
                  <p className="text-gray-700 font-title text-xl flex pt-3">
                    <FaCalendarCheck />
                    <span className="pl-3">
                      End date:{" "}
                      <Moment format="MM/DD/YYYY">
                        {project.end_at
                          ? project.end_at.toString()
                          : "Not Defined"}
                      </Moment>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <hr />
            <div className="project-modal-stats py-8 px-2 sm:pl-6 sm:pr-4">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetail;
