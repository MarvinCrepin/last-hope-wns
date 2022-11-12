import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import { useSelector } from "react-redux";

import { FaSearch } from "react-icons/fa";

import { User } from "../global";
import TableDashboard from "../common/TableDashboard";
import Error from "../common/Error";
import {
  columnsByRole,
  notify,
  ROLELISTFORSELECT,
  theme,
} from "../common/Utils";
import { role, user } from "../../slicer/authSlice";

import getAllUsers from "../../graphql/queries/User/GetAllUsers";
import UpdateUser from "../../graphql/queries/User/UpdateUser";
import DeleteUser from "../../graphql/queries/User/DeleteUser";
import ModalConfirm from "../common/ModalConfirm";

export default function EmployeesList() {
  const userRole = useSelector(role);
  const myInformation = useSelector(user);
  const columns = columnsByRole(userRole, "actions");

  const [list, setList] = useState<User[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [userRoleFilter, userRoleFilterSet] = useState("all");

  const { loading, error, data } = useQuery(getAllUsers);

  const [updateUser] = useMutation(UpdateUser, {
    refetchQueries: [{ query: getAllUsers }],
    onCompleted: () => {
      notify("success", "User succesfully updated");
    },
    onError: (error) => {
      notify(
        "error",
        `Something went wrong with the update of the user [${error.message}]`
      );
    },
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

      if (userRoleFilter !== "all") {
        dataFiltered = dataFiltered.filter(
          (el: User) => el.roles === userRoleFilter
        );
      }

      setList([
        ...dataFiltered.filter((el: User) => el.id !== myInformation.id),
      ]);
    }
  }, [data, searchInput, userRoleFilter]);

  const changeStatus = (user: any) => {
    const UserId = user.item.id;
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

  const [modalConfirmDelete, setModalConfirmDelete] = useState(false);
  const [userSelected, setUserSelected] = useState(null);

  const displayConfirmModalDelete = (state: boolean, user: any) => {
    setUserSelected(user);
    setModalConfirmDelete(state);
  };

  const deleteEmployee = async (user: any) => {
    const UserId = user.id;
    try {
      await deleteUser({ variables: { userId: UserId } });
      displayConfirmModalDelete(false, null);
      notify("success", `${user.user} has been deleted.`);
    } catch (error) {
      console.error(error);
      notify(
        "error",
        "Something went wrong with the deletion of the employee."
      );
    }
  };

  return (
    <>
      <ModalConfirm
        textButtonConfirm="Delete"
        textButtonCancel="Cancel"
        title="Delete this user?"
        text="Are you sure you want to delete this user? This action cannot be canceled."
        onConfirm={() => deleteEmployee(userSelected)}
        onCancel={() => displayConfirmModalDelete(false, null)}
        isOpen={modalConfirmDelete ? true : false}
      />
      <div className="relative">
        <div
          className={`w-full ${theme(
            userRole,
            "dashboard"
          )}  z-20 py-6 sm:py-8 px-2 rounded-tr-md md:h-30`}
        >
          <div className="flex flex-col space-y-5 md:space-y-0 md:flex-row justify-between items-center">
            <div className="flex items-center flex-col space-y-2 md:space-y-0 md:flex-row">
              <label className="sr-only" htmlFor="filterSelect">
                Filter:
              </label>
              <select
                value={userRoleFilter}
                name="filterSelect"
                id="filterSelect"
                className="w-36 rounded-md bg-lh-secondary text-lh-light p-2 mx-2"
                onChange={(e) => userRoleFilterSet(e.target.value)}
              >
                <option value={"all"}>All</option>
                {ROLELISTFORSELECT.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
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
                className="rounded-md h-8 mx-2 px-8 w-full"
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
                deleteAction={(user) => {
                  displayConfirmModalDelete(true, user);
                }}
                updateAction={(user) => console.log(user)}
                viewAction={(user) => console.log(user)}
              />
            )}
          </Transition>
        </div>
      </div>
    </>
  );
}
