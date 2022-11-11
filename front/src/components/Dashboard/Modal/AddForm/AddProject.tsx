import React, { useState } from "react";

import { FaRegUserCircle } from "react-icons/fa";
import { useMutation } from "@apollo/client";

import "../../../../assets/css/addProject.css";
import { User } from "../../../global";
import { classNames, roleList } from "../../../common/Utils";

import { AiFillSetting, AiOutlineClose } from "react-icons/ai";
import AddMemberToProject from "./AddMemberToProject";
import AddProjectMutation from "../../../../graphql/mutation/Project/AddProjectMutation";
import getAllProjects from "../../../../graphql/queries/Project/GetAllProject";
import { notify } from "../../../common/Utils";
import ButtonForm from "../../../Login/ButtonForm";

type Props = {
  users: User[];
  closeModal: () => void;
};

function AddProject({ users, closeModal }: Props) {
  const [addProject, { data, loading, error }]: any = useMutation(
    AddProjectMutation,
    {
      refetchQueries: [{ query: getAllProjects }],
    }
  );

  const [modalAssignee, setModalAssignee] = useState(false);
  const [usersAssignee, setUsersAssignee] = useState<any[]>([]);
  const [dataProject, setDataProject] = useState<any>({});
  const [estimatedTime, setEstimatedTime] = useState({ hour: 0, min: 0 });

  const parseAndSetTime = (target: HTMLInputElement) => {
    let value = parseInt(target.value);
    setEstimatedTime({ ...estimatedTime, [target.name]: value });
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setDataProject({ ...dataProject, [e.target.name]: e.target.value });
  };

  const openModal = (modal: string) => {
    if (modal === "assignee") {
      setModalAssignee(true);
    }
  };

  const addUserToProject = (user: any) => {
    setUsersAssignee([
      ...usersAssignee,
      { userId: user.id, firstname: user.firstname, lastname: user.lastname },
    ]);
  };

  const deleteUserToProject = (user: any) => {
    const index: number = usersAssignee.findIndex(
      (userAssignee) => user.userId === userAssignee.userId
    );

    let result = [...usersAssignee];

    if (index !== -1) {
      setUsersAssignee([...result.splice(index + 1, 1)]);
    }
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    let participants: { userId: string }[] = [];
    usersAssignee.forEach((user) => participants.push({ userId: user.userId }));

    let dataProjectUsers = { ...dataProject, participants: participants };

    dataProjectUsers = {
      ...dataProjectUsers,
      estimated_time: estimatedTime.hour * 60 + estimatedTime.min,
    };

    addProject({
      variables: {
        data: { ...dataProjectUsers },
      },
      onCompleted: () => {
        closeModal();
        notify("success", "Successfuly project added");
      },
      onError: () => {
        notify("error", "Error during adding a project");
      },
    });
  };

  const addProjectFieldsCheck = () => {
    if (dataProject.title && dataProject.product_owner_id) {
      return true;
    }
    return false;
  };

  return (
    <>
      {modalAssignee && (
        <AddMemberToProject
          closeModal={() => setModalAssignee(false)}
          addUser={(user) => addUserToProject(user)}
          deleteUser={(user) => deleteUserToProject(user)}
          usersAssignee={usersAssignee}
        />
      )}
      <div
        className="fixed z-10 inset-0 overflow-y-auto"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
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

          <div className="add-modal inline-block align-bottom text-left transform transition-all sm:align-middle project-modal ">
            <div className=" bg-lh-primary text-2xl h-12 font-title text-lh-light w-40 flex justify-center items-center rounded-t-lg">
              <div>Add Project</div>
            </div>
            <div className=" relative bg-white rounded-lg text-left overflow-hidden transform transition-all project-modal-inside">
              <div
                className="absolute right-2 top-2 text-lh-primary cursor-pointer"
                onClick={() => closeModal()}
              >
                <AiOutlineClose size={30} />
              </div>
              <div className="add-project-modal p-4 sm:pl-6 sm:pr-6">
                <form onSubmit={(e) => handleSubmit(e)}>
                  {/* TITLE */}
                  <div className="part add-title flex flex-col mb-4">
                    <label className="text-lh-primary  mb-1.5 text-2xl">
                      Title
                    </label>
                    <input
                      onChange={(e) => handleChange(e)}
                      type="text"
                      name="title"
                      id="title"
                    />
                  </div>

                  {/* DESCRIPTION */}
                  <div className="part add-desc flex flex-col mb-4">
                    <label className="text-lh-primary mb-1.5 text-2xl">
                      Description
                    </label>
                    <textarea
                      onChange={(e) => handleChange(e)}
                      name="description"
                      id="description"
                    />
                  </div>

                  {/* PROJECT OWNER */}
                  <div className="part add-p-owner flex flex-col mb-4">
                    <label className="text-lh-primary mb-1.5 text-2xl">
                      Project Owner
                    </label>

                    <select
                      name="product_owner_id"
                      className="bg-lh-light border-2 border-lh-dark py-1 px-1.5 mr-5 select-product-owner cursor-pointer"
                      onChange={(e) => handleChange(e)}
                    >
                      <option selected disabled>
                        Choose here
                      </option>
                      {users
                        .filter(
                          (user: any) =>
                            user.roles === roleList[0] ||
                            user.roles === roleList[1]
                        )
                        .map((user: User) => (
                          <option value={user.id} key={user.id}>
                            {user.firstname} {user.lastname}
                          </option>
                        ))}
                    </select>
                  </div>

                  {/* DATE */}
                  <div className="part add-date flex flex-col">
                    <div className="mb-4">
                      <label className="text-lh-primary mb-1.5 text-2xl start-date">
                        Start date
                      </label>
                      <input
                        onChange={(e) => handleChange(e)}
                        type="date"
                        name="start_at"
                        id="start_at"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="text-lh-primary mb-1.5 text-2xl end-date">
                        End date
                      </label>
                      <input
                        onChange={(e) => handleChange(e)}
                        type="date"
                        name="end_at"
                        id="end_at"
                      />
                    </div>
                  </div>

                  {/* TIME */}
                  <div className="mb-4 relative flex flex-col">
                    <label
                      htmlFor="estimated-time"
                      className="text-lh-primary text-2xl py-2 mb-1.5"
                    >
                      Estimated time
                    </label>
                    <div className="flex">
                      <div className="time-hours mr-5">
                        <input
                          type="number"
                          name="hour"
                          min={0}
                          onChange={(e) => parseAndSetTime(e.target)}
                          id="estimated-time"
                          className="border-[1.5px] border-lh-dark text-center w-16 appearance-none rounded font-medium"
                        />
                        <span className="font-text ml-1.5 text-lh-dark font-medium">
                          Hours
                        </span>
                      </div>
                      <div className="time-minutes mr-5">
                        <input
                          type="number"
                          name="min"
                          min={0}
                          onChange={(e) => parseAndSetTime(e.target)}
                          id="estimated-time"
                          className="border-[1.5px] border-lh-dark text-center w-16 appearance-none rounded font-medium"
                        />
                        <span className="font-text ml-1.5 font-medium text-lh-dark">
                          Minutes
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* MEMBERS */}
                  <div className="part add-members mb-4">
                    <div className="flex items-center mb-1.5">
                      <label className="text-lh-primary text-2xl mr-2">
                        Members
                      </label>
                      <AiFillSetting
                        onClick={() => openModal("assignee")}
                        className="text-lh-primary cursor-pointer hover:opacity-90 transition-opacity text-2xl"
                      />
                    </div>

                    <div className="flex flex-wrap space-x-4">
                      {usersAssignee.map((user: User) => {
                        return (
                          <div
                            key={user.id}
                            className="font_weight_400 font-text text-xl	flex items-center space-x-1"
                          >
                            <FaRegUserCircle size={30} />
                            <span>{user.firstname}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="add-project-submit flex justify-end w-full mt-2">
                    <ButtonForm
                      text="Add project"
                      type="submit"
                      textSize="text-2xl"
                      textFont="title"
                      isDisabled={!addProjectFieldsCheck()}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddProject;
