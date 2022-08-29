import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import { useSelector } from "react-redux";

import { FaSearch } from "react-icons/fa";

import { Column, User } from "../global";
import TableDashboard from "../common/TableDashboard";
import Error from "../common/Error";
import { columnsByRole, theme } from "../common/Utils";

import { role } from "../../slicer/authSlice";

import getAllUsers from "../../graphql/queries/User/GetAllUsers";
import UpdateUser from "../../graphql/queries/User/UpdateUser";
import DeleteUser from "../../graphql/queries/User/DeleteUser";

export default function EmployeesList() {
  const { loading, error, data } = useQuery(getAllUsers);
  const userRole = useSelector(role);
  const columns = columnsByRole(userRole, "actions");
  const [list, setList] = useState<User[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [updateUser] = useMutation(UpdateUser, {
    refetchQueries: [{ query: getAllUsers }],
  });

  const [deleteUser] = useMutation(DeleteUser, {
    refetchQueries: [{ query: getAllUsers }],
  });

  useEffect(() => {
    if (data) {
      const dataObject = data.GetAllUsers.map((user: any) => ({
        ...user,
        user: user.firstname.concat(" ", user.lastname),
      }));
      let dataFiltered: User[] = [...dataObject];
      if (searchInput.length > 0) {
        dataFiltered = dataFiltered.filter((el: User) =>
          el.lastname.toLowerCase().includes(searchInput.toLowerCase())
        );
      }
      setList([...dataFiltered]);
    }
  }, [data, searchInput]);

  const changeStatus = (user: any) => {
    const UserId = user.project.id;
    const newRole = user.value;

    updateUser({
      variables: {
        userId: UserId,
        data: {
          roles: newRole,
        },
      },
    });
  };

  const deleteEmployee = (user: any) => {
    const UserId = user.id;
    deleteUser({ variables: { userId: UserId } });
  };

  return (
    <div className="relative">
      <div
        className={`w-full ${theme(
          userRole,
          "dashboard"
        )}  z-20 py-8 px-2 rounded-tr-md md:h-30`}
      >
        <div className="flex flex-col space-y-5 md:space-y-0 md:flex-row justify-between items-center">
          <div className="flex items-center flex-col space-y-2 md:space-y-0 md:flex-row">
            <label className="sr-only" htmlFor="filterSelect">
              Filter:
            </label>
            <select
              name="filterSelect"
              id="filterSelect"
              className="w-36 rounded-md bg-lh-primary text-lh-light p-2 mx-2"
            >
              <option value="allProject">All Users</option>
            </select>
          </div>

          <div className="relative flex item-centers">
            <label htmlFor="searchInput" className="sr-only">
              Recherche
            </label>
            <input
              type="text"
              id="searchInput"
              name="searchInput"
              placeholder="Search"
              className="rounded-md h-8 mx-2 px-8"
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <FaSearch className="absolute top-2 left-4 text-gray-500" />
          </div>
        </div>
      </div>
      <div>
        <Transition
          show={error ? true : false}
          enter="transition-opacity duration-75"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {error && <Error />}
        </Transition>

        <Transition
          show={!error ? true : false}
          enter="transition-opacity duration-75"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {!error && !loading && (
            <TableDashboard
              dataList={list}
              loading={loading}
              columns={columns}
              handleChangeSelect={(user) => changeStatus(user)}
              deleteAction={(user) => deleteEmployee(user)}
              updateAction={(user) => console.log(user)}
              viewAction={(user) => console.log(user)}
            />
          )}
        </Transition>
      </div>
    </div>
  );
}
