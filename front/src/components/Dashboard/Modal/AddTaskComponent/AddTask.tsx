import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

import AddTicket from "../../../../graphql/mutation/Ticket/AddTicket";
import getNameAndIdProjects from "../../../../graphql/queries/Project/GetNameAndIdOfAllProject";
import AssigneeUser from "./AssigneeUser";
import getAllTickets from "../../../../graphql/queries/Ticket/GetAllTicket";
import { Project, User } from "../../../global";

type Props = {
  closeModal: () => void;
};

export default function AddTask({ closeModal }: Props) {
  const [taskInformation, setTaskInformation] = useState({
    title: "",
    project_id: "",
    estimated_time: 0,
    due_at: "2017-01-26",
    description: "",
    state_id: "1",
    ticketUser: [{ userId: "cl670yw9102300ppetj4k6vc2" }],
  });

  const [participants, setParticipants] = useState<User[]>([]);
  const [estimatedTime, setEstimatedTime] = useState({ hour: 0, min: 0 });

  const [addTask] = useMutation(AddTicket, {
    refetchQueries: [{ query: getAllTickets }],
    onCompleted(data) {
      console.log(data);
      closeModal();
    },
  });

  const { data: allProjects } = useQuery(getNameAndIdProjects);

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
    addTask({ variables: { data: taskData } });
  };

  return (
    <div
      className="fixed z-10 inset-0 overflow-y-auto"
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

        <div className="inline-block align-bottom text-left transform transition-all sm:align-middle w-1/3 max-h-[900px] h-auto">
          <div className=" bg-lh-primary text-2xl h-12 font-title text-lh-light w-fit px-3 flex justify-center items-center rounded-t-lg">
            <div>Add Task</div>
          </div>
          <div className="bg-white rounded-b-lg rounded-tr-lg flex justify-center min-h-full p-4 text-center sm:p-0 max-h-full h-[80vh]">
            <div className="relative bg-white rounded-lg text-left overflow-auto transform transition-all h-full w-full">
              <div
                className="absolute right-2 top-2 text-lh-primary cursor-pointer"
                onClick={() => closeModal()}
              >
                <AiOutlineClose size={30} />
              </div>
              <div className="p-4 ">
                <div className="section-choice-project">
                  <form
                    onSubmit={(e) => handleSubmit(e)}
                    className="flex flex-col"
                  >
                    <div className="relative flex flex-col">
                      <label
                        htmlFor="project"
                        className="text-lh-primary text-2xl p-2"
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
                            className="w-36 rounded bg-lh-light text-lh-dark p-2 mx-2 border-[1.5px] border-lh-dark focus-visible:ring-lh-primary mb-4"
                            id="project"
                            name="project_id"
                          >
                            <option value={"null"}>Chose a project</option>
                            {allProjects.GetAllProjects.map(
                              (project: Project) => (
                                <option
                                  value={project.id}
                                  key="project_id"
                                  className="hover:outline-lh-primary font-medium"
                                >
                                  {project.title}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                      )}

                      {/* {errorDisplay.display && (
                        <div className="absolute -top-5 text-lh-secondary text-sm">
                          {errorDisplay.message}
                        </div>
                      )} */}
                      <div className="mb-4 relative flex flex-col">
                        <label
                          htmlFor="title"
                          className="text-lh-primary text-2xl p-2"
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
                          className="w-9/12 rounded bg-lh-light text-lh-dark p-2 mx-2 border-[1.5px] border-lh-dark focus-visible:ring-lh-primary"
                          id="title"
                          type="text"
                          name="title"
                          placeholder="Task's title"
                        />
                      </div>
                      <div className="mb-4 relative flex flex-col">
                        <label
                          htmlFor="description"
                          className="text-lh-primary text-2xl p-2"
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
                          className="w-9/12 h-40 rounded bg-lh-light text-lh-dark p-2 mx-2 border-[1.5px] border-lh-dark focus-visible:ring-lh-primary"
                          id="description"
                          name="description"
                          placeholder="Task's description"
                        ></textarea>
                      </div>
                      <div className="mb-4 mx-2 relative flex flex-col">
                        <label
                          htmlFor="estimated-time"
                          className="text-lh-primary text-2xl py-2"
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
                    </div>
                    <AssigneeUser
                      setParticipants={(value: User[]) =>
                        setParticipants(value)
                      }
                    />
                    <button
                      type="submit"
                      className="bg-lh-primary w-fit font-title text-lh-light text-2xl py-1.5 px-3 space-x-2 items-center rounded my-4"
                    >
                      Add Task
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
