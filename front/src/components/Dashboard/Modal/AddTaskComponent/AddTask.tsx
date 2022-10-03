import { useMutation, useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";

import AddTicket from "../../../../graphql/mutation/Ticket/AddTicket";
import getNameAndIdProjects from "../../../../graphql/queries/Project/GetNameAndIdOfAllProject";
import AssigneeUser from "./AssigneeUser";
import getAllTickets from "../../../../graphql/queries/Ticket/GetAllTicket";
import getAllStates from "../../../../graphql/queries/State/GetAllStates";
import { Project, User, State } from "../../../global";
import { notify } from "../../../common/Utils";

type Props = {
  closeModal: () => void;
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function AddTask({ closeModal }: Props) {
  const [taskInformation, setTaskInformation] = useState({
    title: "",
    project_id: undefined,
    estimated_time: 0,
    due_at: undefined,
    description: "",
    state_id: undefined,
    ticketUser: [],
  });

  const [participants, setParticipants] = useState<User[]>([]);
  const [estimatedTime, setEstimatedTime] = useState({ hour: 0, min: 0 });

  const [addTask] = useMutation(AddTicket, {
    refetchQueries: [{ query: getAllTickets }],
    onCompleted() {
      closeModal();
      notify("success", "Task added successfully");
    },
    onError() {
      notify("error", "An error occured");
    },
  });

  const { data: allProjects } = useQuery(getNameAndIdProjects);
  const { data: allStates } = useQuery(getAllStates);

  const parseAndSetTime = (target: HTMLInputElement) => {
    let value = parseInt(target.value);
    setEstimatedTime({ ...estimatedTime, [target.name]: value });
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    let estimatedTimeInHour = estimatedTime.hour + estimatedTime.min / 60;
    let ticketUser: { userId: string }[] = [];
    participants.forEach((user: User) => {
      ticketUser.push({ userId: user.id });
    });

    let taskData = {
      ...taskInformation,
      estimated_time: estimatedTimeInHour,
      ticketUser,
    };
    addTask({
      variables: { data: taskData },
    });
  };

  return (
    <div
      className="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block ">
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

        <div className="inline-block align-bottom text-left transform transition-all sm:align-middle w-full lg:w-2/3  h-auto">
          <div className=" bg-lh-primary text-2xl h-12 font-title text-lh-light w-32 flex justify-center items-center rounded-t-lg">
            <div>Add Task</div>
          </div>
          <div className="relative bg-white rounded-tr-lg rounded-b-lg text-left overflow-auto transform transition-all h-full w-full  max-h-full ">
            <div
              className="absolute right-2 top-2 text-lh-primary cursor-pointer"
              onClick={() => closeModal()}
            >
              <AiOutlineClose size={30} />
            </div>
            <form
              onSubmit={(e) => handleSubmit(e)}
              className="flex flex-col px-6 py-4"
            >
              <div>
                <div className="relative flex flex-col">
                  <label
                    htmlFor="project"
                    className="text-lh-primary text-2xl mb-1.5"
                  >
                    Project
                  </label>
                  {allProjects && (
                    <div>
                      <select
                        required
                        onChange={(e) => {
                          setTaskInformation({
                            ...taskInformation,
                            [e.target.name]: e.target.value,
                          });
                        }}
                        value={taskInformation.project_id}
                        className="w-full rounded bg-lh-light text-lh-dark p-2  border-[1.5px] border-lh-dark focus-visible:ring-lh-primary mb-4"
                        id="project"
                        name="project_id"
                      >
                        <option value={undefined}>Chose a project</option>
                        {allProjects.GetAllProjects.map((project: Project) => (
                          <option
                            value={project.id}
                            key={project.id}
                            className="hover:outline-lh-primary font-medium"
                          >
                            {project.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* {errorDisplay.display && (
                        <div className="absolute -top-5 text-lh-secondary text-sm">
                          {errorDisplay.message}
                        </div>
                      )} */}
                </div>

                <div className="mb-4 relative flex flex-col">
                  <label
                    htmlFor="title"
                    className="text-lh-primary text-2xl mb-1.5"
                  >
                    Title
                  </label>
                  <input
                    required
                    onChange={(e) =>
                      setTaskInformation({
                        ...taskInformation,
                        [e.target.name]: e.target.value,
                      })
                    }
                    className="rounded bg-lh-light text-lh-dark p-2 border-[1.5px] border-lh-dark focus-visible:ring-lh-primary"
                    id="title"
                    type="text"
                    name="title"
                    placeholder="Task's title"
                  />
                </div>

                <div className="mb-4 relative flex flex-col">
                  <label
                    htmlFor="description"
                    className="text-lh-primary text-2xl mb-1.5"
                  >
                    Description
                  </label>
                  <textarea
                    onChange={(e) =>
                      setTaskInformation({
                        ...taskInformation,
                        [e.target.name]: e.target.value,
                      })
                    }
                    className="h-40 rounded bg-lh-light text-lh-dark p-2 border-[1.5px] border-lh-dark focus-visible:ring-lh-primary"
                    id="description"
                    name="description"
                    placeholder="Task's description"
                  ></textarea>
                </div>
                <div className="mb-4 relative flex flex-col">
                  <label
                    htmlFor="state"
                    className="text-lh-primary text-2xl mb-1.5"
                  >
                    Status
                  </label>
                  {allStates && (
                    <select
                      required
                      onChange={(e) => {
                        setTaskInformation({
                          ...taskInformation,
                          [e.target.name]: e.target.value,
                        });
                      }}
                      className="rounded bg-lh-light text-lh-dark p-2  border-[1.5px] border-lh-dark focus-visible:ring-lh-primary"
                      id="state"
                      name="state_id"
                    >
                      <option selected disabled>
                        Chose a state
                      </option>
                      {allStates.GetAllState.map((state: State) => (
                        <option
                          value={state.id}
                          key={state.id}
                          className="hover:outline-lh-primary font-medium"
                        >
                          {state.name}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
                <AssigneeUser
                  setParticipants={(value: User[]) => setParticipants(value)}
                />
                <div className="mb-4 relative flex flex-col">
                  <label
                    htmlFor="estimated-time"
                    className="text-lh-primary text-2xl py-2 mb-1.5"
                  >
                    Estimated time
                  </label>
                  <div className="flex">
                    <div className="time-hours mr-5">
                      <input
                        type="number"
                        name="hour"
                        min={0}
                        onChange={(e) => parseAndSetTime(e.target)}
                        id="estimated-time"
                        className="border-[1.5px] border-lh-dark text-center w-16 appearance-none rounded font-medium"
                      />{" "}
                      <span className="font-text ml-1.5 text-lh-dark font-medium">
                        Hours
                      </span>
                    </div>
                    <div className="time-minutes mr-5">
                      <input
                        type="number"
                        name="min"
                        min={0}
                        onChange={(e) => parseAndSetTime(e.target)}
                        id="estimated-time"
                        className="border-[1.5px] border-lh-dark text-center w-16 appearance-none rounded font-medium"
                      />{" "}
                      <span className="font-text ml-1.5 font-medium text-lh-dark">
                        Minutes
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end w-full">
                  <button
                    disabled={
                      taskInformation.title === "" ||
                      taskInformation.project_id === undefined
                    }
                    type="submit"
                    className={classNames(
                      taskInformation.title === "" ||
                        taskInformation.project_id === undefined
                        ? "bg-lh-dark cursor-not-allowed"
                        : "bg-lh-primary cursor-pointer",
                      " font-title text-lh-light text-2xl py-1.5 px-3 items-center rounded mt-2"
                    )}
                  >
                    Add Task
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
