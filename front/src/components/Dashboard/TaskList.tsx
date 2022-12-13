import { useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { FaSearch, FaPlus } from "react-icons/fa";

import getAllTicketsNotArchive from "../../graphql/queries/Ticket/GetAllTicketsNotArchive";
import GetAllProjects from "../../graphql/queries/Project/GetAllProject";

import { role } from "../../slicer/authSlice";
import { user } from "../../slicer/authSlice";
import { loading as load, TOOGLE_LOAD } from "../../slicer/appSlice";
import TableDashboard from "../common/TableDashboard";
import Error from "../common/Error";
import TaskDetail from "./Modal/TaskDetail";
import AddTask from "./Modal/AddTaskComponent/AddTask";

import { Column, Project, TaskInList } from "../global";
import { theme } from "../common/Utils";
import { useLocation } from "react-router-dom";

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
  const location = useLocation();

  const { loading, error, data } = useQuery(getAllTicketsNotArchive, {
    variables: { isarchive: false },
  });
  const { data: dataProjects } = useQuery(GetAllProjects);

  const [hideDone, setHideDone] = useState(false);
  const [myTask, setMyTask] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [displayModalTaskDetails, setDisplayModalTaskDetails] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskInList | null>();
  const [listTask, setListTask] = useState<TaskInList[]>([]);
  const [projectFiltered, setProjectFiltered] = useState("all");
  const [displayModalAddTask, setDisplayAddTask] = useState(false);

  const OpenAddTask = () => {
    setDisplayAddTask(true);
  };

  const closeAddTask = () => {
    setDisplayAddTask(false);
  };

  const openTask = (el: TaskInList) => {
    setSelectedTask(el);
    setDisplayModalTaskDetails(true);
  };

  const closeModalTaskDetails = () => {
    setSelectedTask(null);
    setDisplayModalTaskDetails(true);
  };

  const formatData = (entries: any[]) => {
    let result: TaskInList[] = [];
    entries.forEach((element) => {
      let newData: any = {
        id: element.id,
        title: element.title,
        advancement: element.advancement,
        due_at: element.due_at,
        participants: [],
        description: element.description,
        estimated_time: element.estimated_time,
        state: element.state,
        state_id: element.state_id,
        project_name: element.project.title,
        project: {
          ...element.project,
        },
      };

      element.ticketUser.forEach((participant: any) => {
        newData.participants.push({
          ...participant.user,
          tickerUserId: participant.id,
        });
      });

      result.push(newData);
    });
    return result;
  };

  useEffect(() => {
    const projectId:any = location.state;

    if (projectId) {
      setProjectFiltered(projectId.projectId);
    }
  }, [location]);

  useEffect(() => {
    if (data && dataProjects) dispatch(TOOGLE_LOAD(false));
  }, [data, dataProjects, dispatch]);

  useEffect(() => {
    if (data && !loadingInStore) {
      let dataFiltered: TaskInList[] = [...formatData(data.GetAllTickets)];

      // si une tache est selectionnée, on la met à jour dans le tableau
      if (selectedTask) {
        const index = dataFiltered.findIndex(
          (el: TaskInList) => el.id === selectedTask.id
        );
        if (index !== -1) {
          setSelectedTask(dataFiltered[index]);
        }
      }

      if (searchInput.length > 0) {
        dataFiltered = dataFiltered.filter((el: TaskInList) =>
          el.title.toLowerCase().includes(searchInput.toLowerCase())
        );
      }

      if (hideDone) {
        dataFiltered = dataFiltered.filter((el) => el.advancement < 100);
      }

      if (myTask) {
        let result: any = [];

        dataFiltered.forEach((el) => {
          if (el.participants.filter((e) => e.id === me.id).length > 0) {
            result.push(el);
          }
        });

        dataFiltered = result;
      }

      if (projectFiltered) {
        if (projectFiltered !== "all") {
          dataFiltered = dataFiltered.filter(
            (el) => el.project.id === projectFiltered
          );
        }        
      }
      setListTask([...dataFiltered]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, hideDone, myTask, searchInput, projectFiltered]);

  return (
    <div className="relative">
      {displayModalTaskDetails && selectedTask && (
        <TaskDetail
          taskPassed={selectedTask}
          closeModal={() => closeModalTaskDetails()}
        />
      )}

      {displayModalAddTask && <AddTask closeModal={() => closeAddTask()} />}

      <div
        className={`w-full ${theme(
          userRole,
          "dashboard"
        )}  z-20 py-6 sm:py-8 lg: px-2 rounded-tr-md `}
      >
        <div className="flex flex-col-reverse  md:space-y-0 md:flex-row justify-between items-center ">
          <div className="flex items-center flex-col space-y-3 md:space-y-0 md:flex-row ">
            <label className="sr-only" htmlFor="filterSelect">
              Filter:
            </label>
            <div className="flex flex-row justify-center items-center sm:justify-start  flex-wrap gap-2">
              <select
                name="filterSelect"
                id="filterSelect"
                className="w-auto h-8 rounded-md bg-lh-secondary text-lh-light pl-2 mx-2 cursor-pointer"
                onChange={(e) => {
                  setProjectFiltered(e.target.value);
                }}
              >
                <option value="all">All Projects</option>
                {dataProjects &&
                  dataProjects.GetAllProjects.length > 0 &&
                  dataProjects.GetAllProjects.map((el: Project) => {
                    return (
                      <option selected={projectFiltered === el.id} value={el.id} key={el.id}>
                        {el.title}
                      </option>
                    );
                  })}
              </select>
              <div className="flex">
                <div className="mx-2 flex items-center space-x-1">
                  <input
                    className="rounded-md h-5 w-5 cursor-pointer"
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
                    className="rounded-md h-5 w-5 cursor-pointer"
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
            </div>
          </div>
          <div className="flex items-center space-x-1 mr-2">
            <div className="relative flex item-centers mr-2">
              <label htmlFor="searchInput" className="sr-only">
                Recherche
              </label>
              <input
                type="text"
                id="searchInput"
                name="searchInput"
                placeholder="Search"
                className="rounded-md h-8 mx-2 px-8  w-full"
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <FaSearch className="absolute top-2 left-4 text-gray-500" />
            </div>
            {userRole === "ROLE_ADMIN" && (
              <button
                className=" flex bg-lh-light font-text font-bold text-lh-primary items-center p-1.5 rounded-md space-x-2"
                onClick={(): void => {
                  OpenAddTask();
                }}
              >
                <FaPlus className="" />
                <div className="sm:block hidden w-max">Add Task</div>
              </button>
            )}
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
