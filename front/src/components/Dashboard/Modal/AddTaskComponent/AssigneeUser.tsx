import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";

import GetAllUsers from "../../../../graphql/queries/User/GetAllUsers";

import { User } from "../../../global";

import { FaCheck } from "react-icons/fa";
import { RiCloseCircleFill } from "react-icons/ri";

type Props = {
  setParticipants: Function;
};

function AssigneeUser({ setParticipants }: Props) {

  const [userSelected, setUserSelected] = useState<User | null>(null);
  const [participantsSelected, setParticipantsSelected] = useState<User[]>([]);

  const [usersAvailable, setUsersAvailable] = useState<User[]>([]);

  const [getAllUsersList] = useLazyQuery(GetAllUsers, {
    onCompleted: (data) => {
      setParticipants([...participantsSelected]);
      let participantsId: string[] = [];
      participantsSelected.forEach((user: User) => {
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

  const deleteAssigneeUser = (user: any) => {
    let newAssigneeUser = participantsSelected.filter(
      (participant: User) => participant.id !== user.id
    );
    setParticipantsSelected(newAssigneeUser);
  };

  const assigneeUserToTask = () => {
    if (userSelected) {
      setParticipantsSelected([...participantsSelected, userSelected]);
      setUserSelected(null);
    }
  };

  const handleChangeSelected = (e: any) => {
    console.log(e.target.value);
    if (e.target.value !== "select") {
      const index = usersAvailable.findIndex(
        (user: User) => user.id === e.target.value
      );
      setUserSelected(usersAvailable[index]);
    }
  };

  useEffect(() => {
    getAllUsersList();
  }, [getAllUsersList, participantsSelected]);

  return (
    <div className="mx-2">
      <h3 className="text-lh-primary font-text text-3xl">Assignee</h3>
      <div className="my-2 w-full">
        <div className="flex w-full justify-between items-center">
          <select
            onChange={(e) => {
              handleChangeSelected(e);
            }}
            value={userSelected ? userSelected.id : "select"}
            name="advancement"
            id="advancement"
            className="bg-lh-light w-2/3 border-2 border-lh-dark rounded-lg px-1.5 py-2"
          >
            <option value={"select"} defaultValue="true">
              Select
            </option>
            {usersAvailable.map((user: User) => {
              return <option value={user.id}>{user.firstname}</option>;
            })}
          </select>
          <div
            className={
              userSelected
                ? "text-lh-primary cursor-pointer hover:opacity-70"
                : "text-gray-500 cursor-not-allowed"
            }
            onClick={(e) => assigneeUserToTask()}
          >
            <FaCheck size={30} />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap  ">
        {participantsSelected.map((user: User) => {
          return (
            <div
              key={user.id}
              className="relative bg-lh-secondary rounded-lg px-8 py-2 mb-2 w-fit shadow-lg mr-4"
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

export default AssigneeUser;
