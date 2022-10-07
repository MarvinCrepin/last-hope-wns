import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";

import moment, { Duration, Moment } from "moment";

import UpdateTicket from "../../../graphql/mutation/Ticket/UpdateTicket";
import GetAllState from "../../../graphql/queries/State/GetAllStates";
import DeleteTicket from "../../../graphql/mutation/Ticket/DeleteTicket";
import CreateTicketDurationUser from "../../../graphql/mutation/TicketDurationUser/CreateTicketDurationUser";
import GetTotalTicketDurationUserByTicket from "../../../graphql/queries/TicketDurationUser/GetTotalTicketDurationUserByTicket";

import { BsHourglass, BsHourglassBottom } from "react-icons/bs";
import { FaArchive, FaRegUserCircle, FaTrashAlt } from "react-icons/fa";
import {
  AiFillSetting,
  AiOutlineClose,
  AiOutlineLoading,
} from "react-icons/ai";
import { FiMoreHorizontal } from "react-icons/fi";
import { FaPencilAlt } from "react-icons/fa";

import { State, TaskInList, UserParticipant } from "../../global";
import { TOOGLE_LOAD } from "../../../slicer/appSlice";
import { user } from "../../../slicer/authSlice";

import AssigneeAddUser from "./TaskDetailComponent/AssigneeAddUser";
import getAllTicketsNotArchive from "../../../graphql/queries/Ticket/GetAllTicketsNotArchive";
import CommentList from "./TaskDetailComponent/CommentList";
import { isAuthorizedToManageProject, notify } from "../../common/Utils";
import ModalConfirm from "../../common/ModalConfirm";
import EditTaskText from "./TaskDetailComponent/EditTaskText";
import getAllProjects from "../../../graphql/queries/Project/GetAllProject";

type Props = {
  taskPassed: TaskInList;
  closeModal: () => void;
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function TaskDetail({ taskPassed, closeModal }: Props) {
  const dispatch = useDispatch();
  const userInStore = useSelector(user);

  // Query
  const { loading: loadingState, data: dataState } = useQuery(GetAllState);
  const [updateTicket, { data }] = useMutation(UpdateTicket, {
    refetchQueries: [
      { query: getAllTicketsNotArchive, variables: { isarchive: false } },
    ],
  });
  const { loading: totalDurationError, data: totalDuration } = useQuery(
    GetTotalTicketDurationUserByTicket,
    { variables: { ticketId: taskPassed.id } }
  );

  // Mutation
  const [createTicketDurationUser, { loading: loadCreate }] = useMutation(
    CreateTicketDurationUser,
    {
      refetchQueries: [
        {
          query: GetTotalTicketDurationUserByTicket,
          variables: { ticketId: taskPassed.id },
        },
        {
          query: getAllProjects,
        },
      ],
    }
  );
  const [deleteTicket, { loading: loadDelete }] = useMutation(DeleteTicket, {
    refetchQueries: [
      { query: getAllTicketsNotArchive, variables: { isarchive: false } },
    ],
    onCompleted() {
      closeModal();
      notify("success", "Delete ticket success");
    },
  });

  // State
  const [task, setTask] = useState<TaskInList | any>({});
  const [hourFrom, setHourFrom] = useState({ hourFrom: 0, minFrom: 0 });
  const [hourTo, setHourTo] = useState({ hourTo: 0, minTo: 0 });
  const [modalAssignee, setModalAssignee] = useState(false);
  const [modalConfirmDelete, setModalConfirmDelete] = useState(false);
  const [modalConfirmArchive, setModalConfirmArchive] = useState(false);
  const [modalEditTask, setModalEditTask] = useState(false);

  const openModal = (modal: string) => {
    if (modal === "assignee") {
      setModalAssignee(true);
    }
  };

  useEffect(() => {
    if (taskPassed) {
      setTask(taskPassed);
    }
  }, [taskPassed]);

  useEffect(() => {
    if (data) {
      setTask(data.UpdateTicket);
    }
  }, [data]);

  const changehourFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name.includes("hour")) {
      if (parseInt(e.target.value) <= 24) {
        setHourFrom({ ...hourFrom, [e.target.name]: e.target.value });
      }
    }
    if (e.target.name.includes("min")) {
      if (parseInt(e.target.value) <= 59) {
        setHourFrom({ ...hourFrom, [e.target.name]: e.target.value });
      }
    }
  };

  const changehourTo = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name.includes("hour")) {
      if (parseInt(e.target.value) <= 24) {
        setHourTo({ ...hourTo, [e.target.name]: e.target.value });
      }
    }
    if (e.target.name.includes("min")) {
      if (parseInt(e.target.value) <= 59) {
        setHourTo({ ...hourTo, [e.target.name]: e.target.value });
      }
    }
  };

  const differenceInHour = () => {
    const timeFrom = moment().hour(hourFrom.hourFrom).minute(hourFrom.minFrom);
    const timeTo = moment().hour(hourTo.hourTo).minute(hourTo.minTo);

    const diff = timeTo.diff(timeFrom);
    const duration: Duration = moment.duration(diff);

    return duration.asMinutes();
  };

  const addSpentTime = () => {
    if (differenceInHour() > 0) {
      createTicketDurationUser({
        variables: {
          data: { minute_passed: differenceInHour(), ticket_id: task.id },
        },
        onCompleted: () => {
          notify("success", "You have added time successfully");
          setHourFrom({ hourFrom: 0, minFrom: 0 });
          setHourTo({ hourTo: 0, minTo: 0 });
        },
      });
    }
  };

  const changeEnum = async (
    e: React.ChangeEvent<HTMLSelectElement>,
    type: String
  ) => {
    dispatch(TOOGLE_LOAD(true));

    await updateTicket({
      variables: {
        ticketId: task.id,
        data: {
          [e.target.name]:
            type === "int" ? parseInt(e.target.value) : e.target.value,
        },
      },
    });
    notify("success", "Updtate ticket success");
  };

  const deleteTask = async (id: string) => {
    deleteTicket({ variables: { ticketId: id } });
  };

  const archiveTask = async (id: string) => {
    updateTicket({
      variables: {
        ticketId: id,
        data: { isArchived: true },
      },
      onCompleted() {
        closeModal();
        notify("success", "Archive ticket success");
      },
    });
  };

  return (
    <>
      <ModalConfirm
        textButtonConfirm="Delete"
        textButtonCancel="Cancel"
        title="Delete Task ?"
        text="Are you sure you want to delete this task? This action cannot be canceled."
        onConfirm={() => deleteTask(task.id)}
        onCancel={() => setModalConfirmDelete(false)}
        isOpen={modalConfirmDelete ? true : false}
      />
      <ModalConfirm
        textButtonConfirm="Archive"
        textButtonCancel="Cancel"
        title="Archive Task ?"
        text="Are you sure you want to archive this task?"
        onConfirm={() => archiveTask(task.id)}
        onCancel={() => setModalConfirmArchive(false)}
        isOpen={modalConfirmArchive ? true : false}
      />
      {modalAssignee && (
        <AssigneeAddUser
          closeModal={() => setModalAssignee(false)}
          task={task}
        />
      )}

      <EditTaskText
        task={task}
        closeModal={() => setModalEditTask(false)}
        isOpen={modalEditTask ? true : false}
        updatedTask={async (data) => {
          updateTicket({ variables: { ticketId: task.id, data } });
          setModalEditTask(false);
        }}
      />
      <div
        className="task-detail fixed z-10 inset-0 overflow-y-auto"
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

          <div className="p-8 inline-block align-bottom text-left transform transition-all  sm:align-middle  w-full h-full">
            <div className="flex w-full">
              <div className=" bg-lh-primary text-xl h-12  font-text text-lh-light w-fit px-3 flex justify-center items-center rounded-t-lg">
                <div>{`Task detail - ${task.title}`}</div>
              </div>
              {isAuthorizedToManageProject(userInStore.roles) && (
                <Menu as="div" className="relative inline-block text-left">
                  <Menu.Button className=" bg-lh-dark text-xl h-12  font-text text-lh-light w-fit px-3 flex justify-center items-center rounded-t-lg">
                    <FiMoreHorizontal />
                  </Menu.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2  max-w-lg min-w-[11rem] origin-top-right rounded-md bg-lh-light shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <div
                              onClick={() => setModalConfirmDelete(true)}
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-lh-dark",
                                "flex items-center gap-x-2 px-4 py-2 text-md cursor-pointer"
                              )}
                            >
                              <FaTrashAlt
                                size={22}
                                color="var(--primary-color)"
                              />
                              Delete task
                            </div>
                          )}
                        </Menu.Item>
                        {!task.isArchived && (
                          <Menu.Item>
                            {({ active }) => (
                              <div
                                onClick={() => setModalConfirmArchive(true)}
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-lh-dark",
                                  "flex items-center gap-x-2 px-4 py-2 text-md cursor-pointer"
                                )}
                              >
                                <FaArchive
                                  size={22}
                                  color="var(--primary-color)"
                                />
                                Archive task
                              </div>
                            )}
                          </Menu.Item>
                        )}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              )}
            </div>
            <div className="relative bg-white rounded-b-lg rounded-tr-lg flex flex-col lg:grid lg:grid-cols-2 py-8 ">
              <div
                className="absolute right-2 top-2 text-lh-primary cursor-pointer"
                onClick={() => closeModal()}
              >
                <AiOutlineClose size={30} />
              </div>
              {/* Left column */}
              <div className="flex flex-col items-center justify-start">
                <div className="space-y-8 py-4 w-4/5">
                  {/* ZONE TIME */}
                  <div className="flex space-x-3 font-text text-xl	">
                    <div className="space-y-2">
                      <div className="space-x-3 flex items-center inset-1">
                        <BsHourglass size={20} />
                        <div className="">Initial Time Spent Estimee</div>
                      </div>
                      <div className="space-x-3 flex items-center inset-1">
                        <BsHourglassBottom size={20} />
                        <div className="">Total Time Spent</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-lh-dark font-semibold ">
                        {task.estimated_time
                          ? `${task.estimated_time} Hours`
                          : "Non-défini"}
                      </div>
                      <div className="text-lh-primary font-semibold">
                        {`${
                          totalDuration
                            ? moment
                                .duration(
                                  totalDuration.GetTicketDurationUserByTicket
                                    .totalTime,
                                  "minutes"
                                )
                                .asHours()
                                .toFixed(0)
                            : 0
                        } Hours  ${
                          totalDuration && task.estimated_time
                            ? `( ${(
                                (totalDuration.GetTicketDurationUserByTicket
                                  .totalTime *
                                  100) /
                                (task.estimated_time * 60)
                              ).toFixed(2)} %)`
                            : ""
                        } `}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lh-primary font-title text-4xl">
                        {task.title}
                      </h3>
                      <FaPencilAlt
                        size={30}
                        onClick={() => setModalEditTask(true)}
                        className="text-lh-primary cursor-pointer hover:opacity-90 transition-opacity"
                      />
                    </div>
                    <div>
                      <p className="font_weight_400 font-text text-xl	">
                        {task.description}
                      </p>
                    </div>
                  </div>

                  {/* Assignee */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lh-primary font-title text-4xl">
                        Assignee
                      </h3>
                      <AiFillSetting
                        onClick={() => openModal("assignee")}
                        size={30}
                        className="text-lh-primary cursor-pointer hover:opacity-90 transition-opacity"
                      />
                    </div>
                    {task.hasOwnProperty("participants") &&
                    task.participants.length > 0 ? (
                      <div className="flex flex-wrap space-x-4">
                        {task.participants.map((user: UserParticipant) => {
                          return (
                            <div
                              key={user.id}
                              className="font_weight_400 font-text text-xl	flex items-center space-x-1"
                            >
                              <FaRegUserCircle size={30} />
                              <span>{user.firstname}</span>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="font_weight_400 font-text text-xl	flex items-center space-x-2">
                        No users found
                      </div>
                    )}
                  </div>

                  {/* Document */}
                  <div className="space-y-4">
                    <h3 className="text-lh-primary font-title text-4xl">
                      Documents
                    </h3>
                    <div className="font_weight_400 font-text text-xl	flex items-center space-x-2">
                      No documents found
                    </div>
                  </div>

                  {/* Edit */}
                  <div className="space-y-4">
                    <h3 className="text-lh-primary font-title text-4xl">
                      Edit
                    </h3>
                    <div className="flex  flex-col lg:grid  lg:grid-cols-5 gap-4">
                      <div className="font_weight_400 font-text text-xl	flex items-center space-x-2  lg:col-span-2 ">
                        <div className="flex items-center">
                          <div className=" space-y-4">
                            <div className="h-10">From</div>
                            <div className="h-10">To</div>
                          </div>

                          <div className="space-y-4">
                            <div className="flex">
                              <input
                                value={hourFrom.hourFrom}
                                onChange={(e) => changehourFrom(e)}
                                className="bg-lh-primary w-10 h-10 mx-2 rounded-lg text-lh-light  text-center  "
                                min={0}
                                max={24}
                                type="number"
                                name="hourFrom"
                                id="hourFrom"
                              />
                              <div className="h-10 flex items-center">:</div>
                              <input
                                value={hourFrom.minFrom}
                                onChange={(e) => changehourFrom(e)}
                                min={0}
                                max={59}
                                className="bg-lh-primary w-10 h-10 mx-2 rounded-lg text-lh-light text-center "
                                type="number"
                                name="minFrom"
                                id="minFrom"
                              />
                            </div>

                            <div className="flex">
                              <input
                                value={hourTo.hourTo}
                                onChange={(e) => changehourTo(e)}
                                min={0}
                                max={24}
                                className="bg-lh-primary w-10 h-10 mx-2 rounded-lg text-lh-light flex items-center text-center "
                                type="number"
                                name="hourTo"
                                id="hourTo"
                              />
                              <div className="h-10 flex items-center">:</div>

                              <input
                                value={hourTo.minTo}
                                onChange={(e) => changehourTo(e)}
                                min={0}
                                max={59}
                                className="bg-lh-primary w-10 h-10 mx-2 rounded-lg text-lh-light text-center "
                                type="number"
                                name="minTo"
                                id="minTo"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4 flex items-center justify-start lg:col-span-3">
                        <button
                          disabled={loadCreate || differenceInHour() <= 0}
                          className={classNames(
                            loadCreate ? "grayscale cursor-progress" : "",
                            "bg-lh-secondary font-text text-lh-light py-1.5 px-3 flex space-x-2 items-center rounded-lg "
                          )}
                          onClick={() => addSpentTime()}
                        >
                          {!loadCreate ? (
                            <BsHourglassBottom />
                          ) : (
                            <AiOutlineLoading className="animate-spin" />
                          )}

                          <div>Add to Spent Time</div>
                        </button>
                      </div>
                    </div>

                    {/* Advancement */}
                    <div className="flex  flex-col lg:grid  lg:grid-cols-5 gap-4">
                      <div className="font_weight_400 font-text text-xl	flex items-center space-x-2 lg:col-span-2">
                        <select
                          value={task.advancement}
                          onChange={(e) => changeEnum(e, "int")}
                          name="advancement"
                          id="advancement"
                          className="bg-lh-light w-1/2 border-2 border-lh-dark rounded-lg px-1.5"
                        >
                          <option value={0}>0%</option>
                          <option value={10}>10%</option>
                          <option value={20}>20%</option>
                          <option value={30}>30%</option>
                          <option value={40}>40%</option>
                          <option value={50}>50%</option>
                          <option value={60}>60%</option>
                          <option value={70}>70%</option>
                          <option value={80}>80%</option>
                          <option value={90}>90%</option>
                          <option value={100}>100%</option>
                        </select>
                        <div></div>
                      </div>
                      <div className="space-y-4 flex items-center justify-start lg:col-span-3">
                        <label htmlFor="advancement">Advancement</label>
                      </div>
                    </div>

                    {/* Advancement */}
                    <div className="flex  flex-col lg:grid  lg:grid-cols-5 gap-4">
                      <div className="font_weight_400 font-text text-xl	flex items-center space-x-2 lg:col-span-2">
                        <select
                          onChange={(e) => changeEnum(e, "char")}
                          defaultValue={task.state_id}
                          name="state_id"
                          id="state_id"
                          className="bg-lh-light w-1/2 border-2 border-lh-dark rounded-lg px-1.5"
                        >
                          {!loadingState &&
                            dataState.GetAllState.map((state: State) => (
                              <option key={state.id} value={state.id}>
                                {state.name}
                              </option>
                            ))}
                        </select>
                        <div></div>
                      </div>
                      <div className="space-y-4 flex items-center justify-start lg:col-span-3">
                        <label htmlFor="state_id">Status</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Right column */}
              <div className="border-l-2  flex justify-center">
                <div className="space-y-8 py-4 w-4/5">
                  <CommentList taskId={task.id} userId={userInStore.id} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
