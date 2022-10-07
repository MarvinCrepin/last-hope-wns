import { useLazyQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";

import CreateTicketUser from "../../../../graphql/mutation/TicketUser/CreateTicketUser";
import DeleteTicketUser from "../../../../graphql/mutation/TicketUser/DeleteTicketUser";
import GetAllUsers from "../../../../graphql/queries/User/GetAllUsers";

import { User, UserParticipant } from "../../../global";

import { AiOutlineClose, AiOutlineLoading } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";
import { RiCloseCircleFill } from "react-icons/ri";

type Props = {
  closeModal: () => void;
  task: any;
};

function AssigneeAddUser({ closeModal, task }: Props) {
  const [userSelected, setUserSelected] = useState<string>("null");

  const [usersAvailable, setUsersAvailable] = useState<User[]>([]);

  const [getAllUsersList] = useLazyQuery(GetAllUsers, {
    onCompleted: (data) => {
      let participantsId: string[] = [];
      task.participants.forEach((user: UserParticipant) => {
        participantsId.push(user.id);
      });

      let usersAvailable: User[] = [];

      data.GetAllUsers.forEach((user: User) => {
        if (!participantsId.includes(user.id)) {
          usersAvailable.push(user);
        }
      });

      setUsersAvailable(usersAvailable);
    },
  });

  const [createTicketUser, { loading: loadCreate }] =
    useMutation(CreateTicketUser);

  const [deleteTicketUser, { loading: loadDelete }] =
    useMutation(DeleteTicketUser);

  const deleteAssigneeUser = async (user: any) => {
    await deleteTicketUser({
      variables: {
        userTicketId: user.tickerUserId,
      },
      update(cache) {
        const normalizedId = cache.identify({
          id: user.tickerUserId,
          __typename: "TicketUser",
        });
        cache.evict({ id: normalizedId });
        cache.gc();
      },
    });
  };

  const assigneeUserToTask = async () => {
    if (userSelected !== "null") {
      const data = {
        ticketId: task.id,
        userId: userSelected,
      };
      await createTicketUser({
        variables: {
          data,
        },
      });
      setUserSelected("null");
    }
  };

  const handleChangeSelected = (e: any) => {
    const index = usersAvailable.findIndex(
      (user: User) => user.id === e.target.value
    );

    setUserSelected(usersAvailable[index].id);
  };

  useEffect(() => {
    getAllUsersList();
  }, [task]);

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

        <div className="inline-block align-bottom text-left transform transition-all  sm:align-middle sm:w-1/3 w-full  h-full">
          <div className="w-full relative bg-white rounded-lg flex flex-col">
            <div
              className="absolute right-2 top-2 text-lh-primary cursor-pointer"
              onClick={() => closeModal()}
            >
              <AiOutlineClose size={30} />
            </div>
            <div className="px-6 py-4 w-full">
              <h3 className="text-lh-primary font-title text-4xl">Assignee</h3>

              <form className="my-4 w-full h-full">
                <div className="mb-4 relative flex flex-col">
                  <label
                    htmlFor="title"
                    className="text-lh-primary text-2xl mb-1.5"
                  >
                    Available User
                  </label>
                  <div className="flex w-full justify-between items-center">
                    <select
                      disabled={loadCreate || loadDelete ? true : false}
                      onChange={(e) => {
                        handleChangeSelected(e);
                      }}
                      value={userSelected}
                      name="advancement"
                      id="advancement"
                      className="w-1/2 rounded bg-lh-light text-lh-dark p-2 border-[1.5px] border-lh-dark focus-visible:ring-lh-primary"
                    >
                      {usersAvailable.map((user: User) => {
                        return (
                          <option value={user.id}>{user.firstname}</option>
                        );
                      })}
                      <option value={"null"}>Select</option>
                    </select>
                    {loadCreate || loadDelete ? (
                      <div className="text-lh-secondary cursor-pointer hover:opacity-70">
                        <AiOutlineLoading size={30} className="animate-spin" />
                      </div>
                    ) : (
                      <div
                        className={
                          userSelected !== "null"
                            ? "text-lh-primary cursor-pointer hover:opacity-70"
                            : "text-gray-500 cursor-not-allowed"
                        }
                        onClick={() => assigneeUserToTask()}
                      >
                        <FaCheck size={30} />
                      </div>
                    )}
                  </div>
                </div>
              </form>
              <div className="flex flex-wrap  ">
                {task.participants.map((user: UserParticipant) => {
                  return (
                    <div
                      key={user.id}
                      className="relative bg-lh-secondary rounded-lg px-8 py-2 mb-2 w-fit shadow-lg mx-2"
                    >
                      <span
                        className="absolute -top-3 -right-2.5 bg-white rounded-full"
                        onClick={() => deleteAssigneeUser(user)}
                      >
                        <RiCloseCircleFill
                          size={30}
                          className="text-lh-primary cursor-pointer hover:opacity-70"
                        />
                      </span>
                      <span className="text-lh-light font-text text-lg">
                        {user.firstname}
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

export default AssigneeAddUser;
