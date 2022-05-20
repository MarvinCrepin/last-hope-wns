import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";

import { FaSearch } from "react-icons/fa";

import TableDashboard from "./TableDashboard";
import GetAllProjects from "../../queries/Project/GetAllProject";
import Error from "../common/Error";
import Loading from "../common/Loading";

export default function ProjectList() {
  const [list, setList] = useState<Project[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [hideDone, setHideDone] = useState(false);

  const { loading, error, data } = useQuery(GetAllProjects);

  useEffect(() => {
    if (data) {
      let dataFiltered: Project[] = [...data.GetAllProjects];
      if (searchInput.length > 0) {
        dataFiltered = dataFiltered.filter((el: Project) =>
          el.title.includes(searchInput)
        );
      }
      if (hideDone) {
        dataFiltered = dataFiltered.filter((el) => el.advancement < 100);
      }
      setList([...dataFiltered]);
    }
  }, [data, searchInput, hideDone]);

  return (
    <div className="min-h-screen">
      <div className="w-full bg-lh-primary z-20 py-8 px-2 rounded-tr-md md:h-30 ">
        <div className="flex flex-col space-y-5 md:space-y-0 md:flex-row justify-between items-center">
          <div className="flex items-center flex-col space-y-2 md:space-y-0 md:flex-row">
            <div className="mx-2 flex items-center space-x-1">
              <input
                className="rounded-md h-5 w-5"
                type="checkbox"
                name="hideDone"
                id="hideDone"
                onChange={(e) => setHideDone(e.target.checked)}
              />
              <label htmlFor="hideDone" className="text-lh-light">
                Hide done
              </label>
            </div>
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
          {!error && <TableDashboard projectList={list} loading={loading} />}
        </Transition>
      </div>
    </div>
  );
}
