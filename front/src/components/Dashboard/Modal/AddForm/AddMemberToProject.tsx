import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import GetAllUsers from "../../../../graphql/queries/User/GetAllUsers";

import { User, UserParticipant } from "../../../global";

import { AiOutlineClose, AiOutlineLoading } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";
import { RiCloseCircleFill } from "react-icons/ri";

type Props = {
  closeModal: () => void;
  addUser: (user: any) => void;
  deleteUser: (user: any) => void;
  usersAssignee: any[];
  onCreate?: boolean;
};

function AddMemberToProject({
  closeModal,
  addUser,
  deleteUser,
  usersAssignee,
  onCreate = true,
}: Props) {
  const [userSelected, setUserSelected] = useState<any>("null");

  const [usersAvailable, setUsersAvailable] = useState<User[]>([]);

  const { loading, error, data } = useQuery(GetAllUsers);

  useEffect(() => {
    let participantsId: string[] = [];
    if (onCreate) {
      usersAssignee.forEach((user: any) => {
        participantsId.push(user.userId);
      });
    } else {
      usersAssignee.forEach((userProject: any) => {
        participantsId.push(userProject.user.id);
      });
    }

    let usersNew: User[] = [];

    if (data) {
      data.GetAllUsers.forEach((user: User) => {
        if (!participantsId.includes(user.id)) {
          usersNew.push(user);
        }
      });
    }

    setUsersAvailable(usersNew);

    setUserSelected("null");
  }, [usersAssignee, data, loading]);

  const handleChangeSelected = (e: any) => {
    const index = usersAvailable.findIndex(
      (user: User) => user.id === e.target.value
    );

    setUserSelected(usersAvailable[index]);
  };

  return (
    <div
      className="task-detail fixed z-20 inset-0 overflow-y-auto"
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

        <div className="p-8 inline-block align-bottom text-left transform transition-all  sm:align-middle w-1/2  h-full">
          <div className="w-full relative bg-white rounded-lg flex flex-col py-8 ">
            <div
              className="absolute right-2 top-2 text-lh-primary cursor-pointer"
              onClick={() => closeModal()}
            >
              <AiOutlineClose size={30} />
            </div>
            <div className="px-8 w-full">
              <h3 className="text-lh-primary font-title text-4xl">Assignee</h3>
              <form className="my-4 w-full">
                <label
                  htmlFor="user"
                  className="text-lg font-text text-lh-dark"
                >
                  Available User
                </label>
                <div className="flex w-full justify-between items-center">
                  <select
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      handleChangeSelected(e);
                    }}
                    value={userSelected}
                    name="advancement"
                    id="advancement"
                    className="bg-lh-light w-2/3 border-2 border-lh-dark rounded-lg px-1.5 py-2"
                  >
                    {usersAvailable.map((user: User) => {
                      return <option value={user.id}>{user.firstname}</option>;
                    })}
                    <option value={"null"}>Select</option>
                  </select>
                  <div
                    className={
                      userSelected !== "null"
                        ? "text-lh-primary cursor-pointer hover:opacity-70"
                        : "text-gray-500 cursor-not-allowed"
                    }
                    onClick={() =>
                      userSelected !== "null" && addUser(userSelected)
                    }
                  >
                    <FaCheck size={30} />
                  </div>
                </div>
              </form>
              <div className="flex flex-wrap">
                {usersAssignee.map((user: any) => {
                  return (
                    <div
                      key={user.id}
                      className="relative bg-lh-secondary rounded-lg px-8 py-2 mb-2 w-fit shadow-lg mx-2"
                    >
                      <span
                        className="absolute -top-3 -right-2.5 bg-white rounded-full"
                        onClick={() => deleteUser(user)}
                      >
                        <RiCloseCircleFill
                          size={30}
                          className="text-lh-primary cursor-pointer hover:opacity-70"
                        />
                      </span>
                      <span className="text-lh-light font-text text-lg">
                        {onCreate ? user.firstname : user.user.firstname}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddMemberToProject;
