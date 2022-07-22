import { useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

import getAllTickets from "../../queries/Ticket/GetAllTicket";
import GetAllProjects from "../../queries/Project/GetAllProject";

import { role } from "../../slicer/authSlice";
import { user } from "../../slicer/authSlice";
import { loading as load, TOOGLE_LOAD } from "../../slicer/appSlice";
import TableDashboard from "../common/TableDashboard";
import Error from "../common/Error";
import TaskDetail from "./Modal/TaskDetail";

import { Column, Project, TaskInList } from "../global";
import { theme } from "../common/Utils";

const columns: Column[] = [
  { id: "title", label: "Subject", style: "text", metadata: {} },
  {
    id: "project_name",
    label: "Project",
    style: "text",
    metadata: {},
  },
  { id: "advancement", label: "Status", style: "linear-bar", metadata: {} },
  {
    id: "assignee",
    label: "Assignee",
    style: "text",
    metadata: {},
  },

  {
    id: "due_at",
    label: "Due date",
    style: "date",
    metadata: { format: "YYYY/MM/DD" },
  },
];

export default function TaskList() {
  const dispatch = useDispatch();
  const me = useSelector(user);
  const userRole = useSelector(role);
  const loadingInStore = useSelector(load);

  const { loading, error, data } = useQuery(getAllTickets);
  const {
    loading: loadingProjects,
    error: errorProjects,
    data: dataProjects,
  } = useQuery(GetAllProjects);

  const [hideDone, setHideDone] = useState(false);
  const [myTask, setMyTask] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [displayModalTaskDetails, setDisplayModalTaskDetails] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskInList | null>();
  const [listTask, setListTask] = useState<TaskInList[]>([]);
  const [projectFiltered, setProjectFiltered] = useState("all");

  const openTask = (el: TaskInList) => {
    setSelectedTask(el);
    setDisplayModalTaskDetails(true);
  };

  const closeModalTaskDetails = () => {
    setSelectedTask(null);
    setDisplayModalTaskDetails(true);
  };

  const formatDate = (entries: any[]) => {
    let result: TaskInList[] = [];
    entries.forEach((element) => {
      let newData: any = {
        id: element.id,
        title: element.title,
        advancement: element.advancement,
        due_at: element.due_at,
        assignee:
          element.ticketUser.length === 0
            ? "-"
            : element.ticketUser[0].user.firstname +
              " " +
              element.ticketUser[0].user.lastname,
        assignee_id:
          element.ticketUser.length === 0 ? "-" : element.ticketUser[0].user.id,
        description: element.description,
        passed_time: element.passed_time,
        estimated_time: element.estimated_time,
        state: element.state,
        state_id: element.state_id,
        project: {
          id: element.project.id,
          title: element.project.title,
        },
      };
      result.push(newData);
    });
    return result;
  };

  useEffect(() => {
    if (data && dataProjects) dispatch(TOOGLE_LOAD(false));
  }, [data]);

  useEffect(() => {
    if (data && !loadingInStore) {
      let dataFiltered: TaskInList[] = [...formatDate(data.GetAllTickets)];

      if (searchInput.length > 0) {
        dataFiltered = dataFiltered.filter(
          (el: TaskInList) =>
            el.title.toLowerCase().includes(searchInput.toLowerCase()) ||
            el.assignee.toLowerCase().includes(searchInput.toLowerCase())
        );
      }
      if (hideDone) {
        dataFiltered = dataFiltered.filter((el) => el.advancement < 100);
      }
      if (myTask) {
        dataFiltered = dataFiltered.filter((el) => el.assignee_id === me.id);
      }

      if (projectFiltered) {
        if (projectFiltered === "all") {
          dataFiltered = dataFiltered;
        } else {
          dataFiltered = dataFiltered.filter(
            (el) => el.project.id === projectFiltered
          );
        }
      }
      setListTask([...dataFiltered]);
    }
  }, [data, hideDone, myTask, searchInput, projectFiltered]);

  return (
    <div className="relative">
      {displayModalTaskDetails && selectedTask && (
        <TaskDetail
          taskPassed={selectedTask}
          closeModal={() => closeModalTaskDetails()}
        />
      )}

      <div
        className={`w-full ${theme(
          userRole,
          "dashboard"
        )}  z-20 py-8 px-2 rounded-tr-md md:h-30`}
      >
        <div className="flex flex-col space-y-5 md:space-y-0 md:flex-row justify-between items-center h-12">
          <div className="flex items-center flex-col space-y-2 md:space-y-0 md:flex-row">
            <label className="sr-only" htmlFor="filterSelect">
              Filter:
            </label>

            <select
              name="filterSelect"
              id="filterSelect"
              className="w-36 rounded-md bg-lh-secondary text-lh-light p-2 mx-2"
              onChange={(e) => {
                setProjectFiltered(e.target.value);
              }}
            >
              <option value="all">All Projects</option>
              {dataProjects &&
                dataProjects.GetAllProjects.length > 0 &&
                dataProjects.GetAllProjects.map((el: Project) => {
                  return (
                    <option value={el.id} key={el.id}>
                      {el.title}
                    </option>
                  );
                })}
            </select>
            <div className="mx-2 flex items-center space-x-1">
              <input
                className="rounded-md h-5 w-5 "
                type="checkbox"
                name="onlyMy"
                id="onlyMy"
                onChange={(e) => setMyTask(e.target.checked)}
              />
              <label htmlFor="onlyMy" className="text-lh-light">
                Assigned to me only
              </label>
            </div>
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

          <div className="relative flex item-centers mr-2">
            <label htmlFor="searchInput" className="sr-only">
              Recherche
            </label>
            <input
              type="text"
              id="searchInput"
              name="searchInput"
              placeholder="Search"
              className="rounded-md h-8 mx-2 px-8 "
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <FaSearch className="absolute top-2 left-4 text-gray-500" />
          </div>
        </div>
      </div>
      <div>
        {/* <Transition
          show={error ? true : false}
          enter="transition-opacity duration-75"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        > */}
        {error && <Error />}
        {/* </Transition> */}

        {/* <Transition
          show={!error ? true : false}
          enter="transition-opacity duration-75"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        > */}
        {!error && (
          <TableDashboard
            dataList={listTask}
            loading={loading || loadingInStore}
            columns={columns}
            clickHandlerRow={(el: TaskInList): void => {
              openTask(el);
            }}
          />
        )}
        {/* </Transition> */}
      </div>
    </div>
  );
}
