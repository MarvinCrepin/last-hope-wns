import { useLazyQuery, useQuery } from "@apollo/client";
import { FormEvent, useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { RiCloseCircleFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import StatHourPerDayByProject from "../../../../graphql/queries/TicketDurationUser/StatHourPerDayByProject";
import StatHourPerDayByProjectAndUser from "../../../../graphql/queries/TicketDurationUser/StatHourPerDayByProjectAndUser";
import { user } from "../../../../slicer/authSlice";
import { isAuthorizedToManageProject, notify } from "../../../common/Utils";
import { UserParticipant } from "../../../global";

import HoursPerDay from "./Chart/HoursPerDay";
import HoursPerDayPerUser from "./Chart/HoursPerDayPerUser";

export const tabs = [
  { label: "Global", value: 1 },
  { label: "Hours Per Day", value: 2 },
];

type Props = {
  project: any;
};

export default function StatsPanel({ project }: Props) {
  const [usersAvailableSelected, setUsersAvailableSelected] = useState<
    UserParticipant[]
  >([]);
  const currentUserInformation = useSelector(user);
  const [selectedUser, setSelectedUser] = useState<string | undefined>(
    undefined
  );
  const [arrayUser, setArrayUser] = useState<never[] | UserParticipant[]>([]);
  const [charthHydrated, setCharthHydrated] = useState<boolean>(false);

  const { loading, error, data } = useQuery(StatHourPerDayByProject, {
    variables: { projectId: project.id },
  });

  const [
    statHourPerDayByProjectAndUser,
    { error: errProjectAndUser, data: dataProjectAndUser },
  ] = useLazyQuery(StatHourPerDayByProjectAndUser);

  useEffect(() => {
    if (project.participants.length > 0) {
      let newArray: UserParticipant[] = [];
      project.participants.forEach((user: { user: UserParticipant }) => {
        newArray.push(user.user);
      });
      setUsersAvailableSelected(newArray);
    }
  }, [project.participants]);

  useEffect(() => {
    if (
      data &&
      !isAuthorizedToManageProject(currentUserInformation, project.id)
    ) {
      const currentUserParticipantInformation: UserParticipant = {
        id: currentUserInformation.id,
        firstname: currentUserInformation.firstname,
        lastname: currentUserInformation.lastname,
      };
      let newArray = [currentUserParticipantInformation];
      setArrayUser(newArray);
    }
  }, [data, currentUserInformation]);

  useEffect(() => {
    if (arrayUser && arrayUser.length > 0) {
      statHourPerDayByProjectAndUser({
        fetchPolicy: "no-cache",
        variables: {
          projectId: project.id,
          userIdArray:
            arrayUser.length > 0
              ? arrayUser.map((user: UserParticipant) => user.id)
              : [],
        },
        onCompleted: () => {
          setCharthHydrated(true);
        },
        onError: (err) => {
          console.error(err);
          notify("Error", "Error while loading data");
          setCharthHydrated(false);
        },
      });
    } else {
      setCharthHydrated(false);
    }
  }, [arrayUser, usersAvailableSelected]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error</p>;
  }

  const addUserInGraph = () => {
    if (selectedUser) {
      const findUser = usersAvailableSelected.findIndex(
        (el: UserParticipant) => el.id === selectedUser
      );
      if (findUser !== -1) {
        if (
          arrayUser.findIndex(
            (el: { id: string }) => el.id === selectedUser
          ) === -1
        ) {
          setArrayUser([...arrayUser, usersAvailableSelected[findUser]]);
        }

        let newArrayAvailableUser = [...usersAvailableSelected];
        newArrayAvailableUser.splice(findUser, 1);
        setUsersAvailableSelected(newArrayAvailableUser);
        setSelectedUser(undefined);
      }
    }
  };

  const deleteUserInGraph = (user: { id: string }) => {
    const findUser = arrayUser.findIndex(
      (el: { id: string }) => el.id === user.id
    );
    if (findUser !== -1) {
      let newArrayAvailableUser: any = [...usersAvailableSelected];

      newArrayAvailableUser.push(arrayUser[findUser]);

      let newArrayUserSelected = [...arrayUser];
      newArrayUserSelected.splice(findUser, 1);

      setArrayUser(newArrayUserSelected);
      setUsersAvailableSelected(newArrayAvailableUser);
    }
  };

  return (
    <>
      <div className="space-y-8">
        <div className="flex items-center ">
          <h3 className="text-lh-primary font-title text-4xl">
            Project Statistics
          </h3>
        </div>
        <div className="space-y-8">
          <HoursPerDay data={data} />
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex items-center flex-wrap justify-between">
          <h3 className="text-lh-primary font-title text-4xl ">
            Member Statistics
          </h3>
          {isAuthorizedToManageProject(currentUserInformation, project.id) && (
            <div className="flex space-x-2">
              <select
                required
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  setSelectedUser(e.target.value);
                }}
                value={selectedUser}
                className="rounded bg-lh-light text-lh-dark p-2  border-[1.5px] border-lh-dark focus-visible:ring-lh-primary"
                id="project"
                name="project_id"
              >
                <option value={undefined}>Chose a members</option>
                {usersAvailableSelected.map((participant: UserParticipant) => (
                  <option
                    value={participant.id}
                    key={participant.id}
                    className="hover:outline-lh-primary font-medium"
                  >
                    {participant.firstname} {participant.lastname}
                  </option>
                ))}
              </select>
              <button
                onClick={(e) => addUserInGraph()}
                className="w-fit bg-lh-primary cursor-pointer text-lh-light py-1.5 px-3  items-center rounded"
              >
                <div className="flex items-center">
                  Apply{" "}
                  <span className="pl-3">
                    <FaCheck size={14} />
                  </span>
                </div>
              </button>
            </div>
          )}
        </div>
        {isAuthorizedToManageProject(currentUserInformation, project.id) ? (
          charthHydrated ? (
            <>
              <HoursPerDayPerUser data={dataProjectAndUser} />
              {isAuthorizedToManageProject(
                currentUserInformation,
                project.id
              ) && (
                <div className="flex ">
                  {arrayUser
                    .sort(function (a: UserParticipant, b: UserParticipant) {
                      if (a.lastname < b.lastname) {
                        return -1;
                      }
                      if (a.lastname > b.lastname) {
                        return 1;
                      }
                      return 0;
                    })
                    .map(
                      (user: {
                        id: string;
                        firstname: string;
                        lastname: string;
                      }) => (
                        <div
                          key={user.id}
                          className="relative bg-lh-secondary rounded-lg px-5 py-1  w-fit shadow-lg mx-2"
                        >
                          <span
                            className="absolute -top-3 -right-2.5 bg-white rounded-full"
                            onClick={() => deleteUserInGraph(user)}
                          >
                            <RiCloseCircleFill
                              size={30}
                              className="text-lh-primary cursor-pointer hover:opacity-70"
                            />
                          </span>
                          <span className="text-lh-light font-text text-base">
                            {user.firstname + " " + user.lastname}
                          </span>
                        </div>
                      )
                    )}
                </div>
              )}
            </>
          ) : (
            <div className="flex items-center justify-center h-52">
              <p className="text-lh-dark font-text text-2xl">
                No user selected
              </p>
            </div>
          )
        ) : (
          <HoursPerDayPerUser data={dataProjectAndUser} />
        )}
      </div>
    </>
  );
}
