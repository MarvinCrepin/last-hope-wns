import { useLazyQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";

import CreateTicketUser from "../../../graphql/mutation/TicketUser/CreateTicketUser";
import DeleteTicketUser from "../../../graphql/mutation/TicketUser/DeleteTicketUser";
import GetAllUsers from "../../../graphql/queries/User/GetAllUsers";

import { User, UserParticipant } from "../../global";

import { AiOutlineLoading } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";
import { RiCloseCircleFill } from "react-icons/ri";

type Props = {
  closeModal: () => void;
  task: any;
};

function AssigneeAddUser({ task }: Props) {
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
    <div className="px-8 w-full">
      <h3 className="text-lh-primary font-title text-4xl">Assignee</h3>
      <form className="my-4 w-full">
        <label htmlFor="user" className="text-lg font-text text-lh-dark">
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
            className="bg-lh-light w-2/3 border-2 border-lh-dark rounded-lg px-1.5 py-2"
          >
            {usersAvailable.map((user: User) => {
              return <option value={user.id}>{user.firstname}</option>;
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
  );
}

export default AssigneeAddUser;
